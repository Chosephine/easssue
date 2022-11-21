# -*- coding: cp949 -*-
import os, sys, urllib.request, json, re
import pandas as pd
import numpy as np
import datetime
from tqdm import tqdm
from konlpy.tag import Mecab
from newspaper import Article
from collections import Counter
import pickle
import mysql.connector

from sqlalchemy import create_engine
import pymysql
import pandas as pd
import urllib
import time


# 1. keyword�� news �˻��ؼ�, ��� 10���� full_description (keyword ���� >1 �뵵 )��, full_nouns (keyword ���� == 1 �뵵 ) ���
## [1] Ű����� �˻��ϱ�
def news_kwds_by_kwd(keywords, processor_idx, return_dict, client_id, client_secret):
    ### Ű����� ���� 10�� �˻��Ͽ� ����Ű���� ���� �Լ�
    # ����� ������ ������
    from_kwd_name_lst = []
    full_description_lst = []
    nouns_lst = []
    
    
    for keyword in tqdm(keywords):
        encText = urllib.parse.quote(keyword)
        url = "https://openapi.naver.com/v1/search/news.json?start=1&display=10&sort=sim&query=" + encText # json ���: 10������ ��� ��������

        request = urllib.request.Request(url)
        request.add_header("X-Naver-Client-Id",client_id)
        request.add_header("X-Naver-Client-Secret",client_secret)
        response = urllib.request.urlopen(request)
        rescode = response.getcode()
        
        # ������ �ִٸ�, description 1���� ��ġ��
        if(rescode==200):
            response_body = response.read()
            response_dict = json.loads(response_body.decode('utf-8'))
            items = response_dict['items']

            mecab = Mecab()
            # ũ�Ѹ��� ��� ���� ���� ��� �ܾ� �̱�
            full_desc = ''
            nouns = []
            for item in tqdm(items):
                # ����: ��ũ�� ���� ��� ����
                if item['originallink'] == '':
                    continue
                desc = url_to_article(item['originallink'])
                # ����: ũ�Ѹ��� �� �ż� null�� �޾��� �� ����
                if pd.isna(desc):
                    continue
                ## ��� ���� ���� ��� �� �ҿ�� �ƴ� ���� ����Ʈ
                nouns += [noun for noun in mecab.nouns(desc) if noun not in stopwords_set]
                full_desc += ' ' + desc
            
            
            # �ش� Ű������ ��� 10�� ��ü description �����ϱ�
            from_kwd_name_lst.append(keyword)
            full_description_lst.append(full_desc) # len > 1 keyword �� 
            nouns_lst.append(nouns) # len == 1 keyword ��
            
            
        else:
            print("Error Code:" + rescode)
            
        time.sleep(1) # api ȣ�� ��ġ�� �ʰ� �ϱ� ���ؼ�, 1�� ����
    

    # return_dict�� �ֱ�
    return_dict[processor_idx] = [from_kwd_name_lst, full_description_lst, nouns_lst]

    return   


            

## [2] url�� description ������
def url_to_article(url):
    ### url �Է� �� ��� ���� ��������
    article = Article(url, language='ko')
    try:
        article.download()
        article.parse()
    except:
        return np.nan
    remove_tag = re.compile('<.*?>|&quot|&apos')
    description = re.sub(remove_tag, '', article.text)
    description = description.replace('\n\n', ' ')
    if description == '':
        description = np.nan
    return description







# 2. from_kwd_id, to_kwd_id, to_kwd_count �� �̷���� DB�� ���� DF �����
def get_count(under_10_from_kwd_name_lst, under_10_full_description_lst, under_10_nouns_lst, processor_idx, return_dict):
    num_of_kwd = len(under_10_from_kwd_name_lst)
    result_df = pd.DataFrame()
    for j in tqdm(range(num_of_kwd)):
        from_kwd_name = under_10_from_kwd_name_lst[j]
        full_desc = under_10_full_description_lst[j]
        nouns = under_10_nouns_lst[j]
        
        
            
        ## Ű������ ���� ī��Ʈ ��ųʸ�
        nouns_counter = dict(Counter(nouns))

        # Ű����, ���� Ű����, ���� Ű���� ���� ������ ������ �����
        from_kwd_id = []
        to_kwd_id = []
        to_kwd_count = []
        for kwd in kwd_lst:   # kwd_lst�� ��ü kwd list�� ���� �� 
            # �˻� Ű����� ����
            if kwd == from_kwd_name:
                continue
            # �˻� Ű���尡 1������ ���(mecab nouns ���)
            elif len(kwd) == 1:
                if kwd in nouns_counter:
                    from_kwd_id.append(kwds_name_id[from_kwd_name])
                    to_kwd_id.append(kwds_name_id[kwd])
                    to_kwd_count.append(nouns_counter[kwd])
            # Ű���� ���ڰ� 2���� �̻��� ���
            elif kwd in full_desc:
                from_kwd_id.append(kwds_name_id[from_kwd_name])
                to_kwd_id.append(kwds_name_id[kwd])
                to_kwd_count.append(full_desc.count(kwd))
                
        result = pd.DataFrame({'from_kwd_id': from_kwd_id, 'to_kwd_id': to_kwd_id, 'to_kwd_count': to_kwd_count})
        # ���� Ű���� ������ ���� �� ���� 5��
        result.sort_values(by=['to_kwd_count'], ascending=False, ignore_index=True, inplace=True)
        result = result.head(5)
        
        # ����� ������ �����ӿ� ��ġ��
        result_df = pd.concat([result_df, result], ignore_index=True)
    
    # return_dict�� �����ϱ�
    return_dict[processor_idx] = result_df
    
    return

#-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    

# 1. ������ �������� 


## [1] ��Ÿ���� �������� 
meta_df = pd.read_csv('/home/ubuntu/data/meta.csv')
print('-'*50)
print('meta data is ' )
print(meta_df)
print('-'*50)
    

max_article_id, article_filedate, article_try, kwd_filedate, kwd_try = meta_df.loc[0,['max_article_id','article_filedate', 'article_try', 'kwd_filedate', 'kwd_try']]
article_try = str(article_try).zfill(2)  # 01�� ���� �������� ����� �ֱ� 
kwd_try = str(kwd_try).zfill(2)          # 01�� ���� �������� ����� �ֱ�

## [2] stopword
with open('/home/ubuntu/data/stopwords.txt', 'r') as f:
    stopwords_lst = f.readlines()    # line 1�� ¥���� �̷���� ����
    stopwords_str = stopwords_lst[0]
    stopwords_str = stopwords_str.split()
    stopwords_set = set(stopwords_str)

## [3] keywords ��������
kwds = pd.read_csv(f'/home/ubuntu/data/kwd/{kwd_filedate}_{kwd_try}_kwd.csv')
kwd_lst = kwds['kwd_name']
with open(f'/home/ubuntu/data/kwd/{kwd_filedate}_{kwd_try}_kwd_name_id.pickle', 'rb') as f:
    kwds_name_id = pickle.load(f)

    
## [4] 10�� �̸��� ��簡 �����ϴ� Ű���� ��������
### (1) ���ó�¥ ��������
today = datetime.datetime.now() + datetime.timedelta(hours=9)
today = today.date().strftime('%Y%m%d')

### (2) ������ ��������
under_10_kwd_df = pd.read_csv(f'/home/ubuntu/data/rel_kwd/{today}_under_10_kwd_df.csv')


### (3) under_10_kwd_lst ����
under_10_kwd_lst = under_10_kwd_df.under_10_kwd_lst.to_list()




# 2. 10�� �̸��� Ű���忡 ���켭, search�ϱ� ------------------------------------------------------------------
print('10�� �̸��� Ű���忡 ���켭, search�ϱ�: start ! ')
print(f'���� search �ϴ� keyword�� ������ {len(under_10_kwd_lst)}')
# print(f'��� : {under_10_kwd_lst}')



## [1] ���̹� ���� api�� id, pwd ����Ʈ
import pandas as pd
client_df = pd.read_csv('/home/ubuntu/data/naver_api.csv')
client_id_lst = client_df.client_id.tolist()
client_secret_lst = client_df.client_secret.tolist()



## [2] description ���� ��Ƽ ���μ���
### (1) ��Ƽ���μ��� ���� 
import multiprocessing
k = 10 # num of jobs of each client
n = k*len(client_id_lst)  

if __name__ == '__main__':
    processes = []
    manager = multiprocessing.Manager()
    
    return_dict_under_10 = manager.dict()     # ����� ����
    for i in tqdm(range(n)):
        start = int((len(under_10_kwd_lst)//n)*i)
        end = int((len(under_10_kwd_lst)//n)*(i+1))
        client_id = client_id_lst[i//k]
        client_secret = client_secret_lst[i//k]
        p = multiprocessing.Process(target=news_kwds_by_kwd, args=(under_10_kwd_lst[start:end], i, return_dict_under_10, client_id, client_secret)) ## �� ���μ����� �۾��� ��� ## ���ڷ� db�� ���� kwd�� ������ �� 
        p.start()
        processes.append(p)
 
    for process in processes:
        process.join()

print('10�� �̸��� Ű���忡 ���켭, search�ϱ�: done!')



### (2) ��Ƽ���μ��� ���  ��ġ��
print('search�� Ű����� list ��� ��ġ��: start!')
under_10_from_kwd_name_lst = []
under_10_full_description_lst = []
under_10_nouns_lst = []

for i in tqdm(range(n)):
    
    from_kwd_name_lst, full_description_lst, nouns_lst = return_dict_under_10[i]
    under_10_from_kwd_name_lst.extend(from_kwd_name_lst)
    under_10_full_description_lst.extend(full_description_lst)
    under_10_nouns_lst.extend(nouns_lst)
print('search�� Ű����� list ��� ��ġ�� : done!')


## [3] keyword count ��Ƽ���μ��� ������
print('10�� �̸��� Ű���忡 ���켭,��Ƽ���μ��� ��� DF�����  : start!')
import multiprocessing
n = len(under_10_nouns_lst)//20

if __name__ == '__main__':
    processes = []
    manager = multiprocessing.Manager()
    
    return_dict_under_10 = manager.dict()     # ����� ����
    print('multiprocessing �Ҵ� : ')
    for i in tqdm(range(n)):
        start = int((len(under_10_kwd_lst)//n)*i)
        end = int((len(under_10_kwd_lst)//n)*(i+1))
        p = multiprocessing.Process(target=get_count, args=(under_10_from_kwd_name_lst[start:end], under_10_full_description_lst[start:end], under_10_nouns_lst[start:end], i, return_dict_under_10) )
        p.start()
        processes.append(p)
 
    for process in processes:
        process.join()

print('10�� �̸��� Ű���忡 ���켭,��Ƽ���μ��� ��� DF�����  : done!')



    

# 3. ����� DF ���� Local�� �����ϰ�, DB�� �ֱ�
print('��Ƽ���μ��� ��� df ��ġ�� ����')
rel_kwd_df_under_10 = pd.DataFrame()

## [1] return_dict_under_10 �����ͼ� 1�� DF�� ��ġ��
for i in tqdm(range(len(return_dict_under_10))):
    cur_df = return_dict_under_10.items()[i][1]
    rel_kwd_df_under_10 = pd.concat([rel_kwd_df_under_10, cur_df], ignore_index=True)

print('10�� �̸��� Ű���忡 ���켭, ��Ƽ���μ��� ��� ���ļ�, ��� DF ����� : done!')
print(rel_kwd_df_under_10.head())



## [2] over10 ��������
import pandas as pd
rel_kwd_df_over_10 = pd.read_csv(f'/home/ubuntu/data/rel_kwd/{today}_rel_kwd_over_10.csv')
print('10�� �̻� ��� ���� Ű������ ����� �������� �Ϸ�')

## [3] under10, over10 ��ġ��
rel_kwd_df = pd.concat([rel_kwd_df_under_10, rel_kwd_df_over_10])


print('�����ϱ� 1/2 : over_10 & under_10 ��ġ�� ����')
print('rel_kwd_df�� columns : ',rel_kwd_df.columns)    
    

## [4] DB�� ���� �������� �����ֱ�    
rel_kwd_df.dropna(subset=['to_kwd_count'], inplace=True)
rel_kwd_df['reg_date'] = today
rel_kwd_df = rel_kwd_df[['from_kwd_id' , 'to_kwd_id', 'reg_date']]


## [5] ���ÿ� �����ϱ�
rel_kwd_df.to_csv(f'/home/ubuntu/data/rel_kwd/{today}_rel_kwd.csv', index=False, header=True)

print('�����ϱ� 2/2 : Local�� ���� ����')




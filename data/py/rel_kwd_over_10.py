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




# �м��� ������ �Լ� : over_10_rel_kwd_search ���� ���� multiporcessing
def over_10_rel_kwd_search(partial_over_10_kwd_lst, processor_idx, return_dict):  # over_10_article_df, kwd_lst �� ������� �־�� �� 
    # 1. ����� ������ �����Ӹ��� list
    result_from_kwd_id = []
    result_to_kwd_id = []
    result_to_kwd_count = []
    
    mecab = Mecab()
        
    # 2. arg�� ���� keyword�鿡 ���� ��縦 Ž��
    from tqdm import tqdm
    for from_kwd_name in tqdm(partial_over_10_kwd_lst):
    
        ## [1] keyword�� �ش��ϴ� ���� ��� ��������
        
        from_kwd_name_full_description = over_10_article_df[over_10_article_df['from_kwd_name']==from_kwd_name]['description']
        ''' from_kwd_name_full_description �� �Ʒ� 
        125    �Ｚ���ڿ� LG������ 6G(6���� �̵����) ����ǥ��Ư�� �ֵ��� ������ ġ���ϴ�. ...
        126    [����=���ϴ��б�] ������ ���ϴ� ������, �����˽� ���� �̹������� �ٽɱ�� ����...
        127    ����Ʈ����(SW) �ڵ����� ���� �귣�� ������Ƽ(AsomeIT)�� SW�ڵ� ���� ...
        131    ���ν� 0 ���ν� �ɲù��ΰ� ��� ���νð� �ݵ�ü ��� ����ⱸ�� �ż����������� �ż�...
        Name: description, dtype: object
        '''
        from_kwd_name_full_description = ' '.join(from_kwd_name_full_description)  # ��� ��ġ��
        
        from_kwd_id = []
        to_kwd_id = []
        to_kwd_count = []
        
        nouns = [noun for noun in mecab.nouns(from_kwd_name_full_description) if noun not in stopwords_set]
        nouns_counter = dict(Counter(nouns))
        
        ## [2] �� keyword �� ��翡 ���ؼ�, ��ü k 
        for kwd in kwd_lst:   # kwd_lst�� ��ü kwd list�� ���� �� 
            # �˻� Ű����� ����
            if kwd == from_kwd_name:
                continue
            # �ѱ��� Ű������ ���(mecab ���)
            
            elif len(kwd) == 1:
                if kwd in nouns_counter:
                    from_kwd_id.append(kwds_name_id[from_kwd_name])
                    to_kwd_id.append(kwds_name_id[kwd])
                    to_kwd_count.append(nouns_counter[kwd])
                
            elif kwd in from_kwd_name_full_description:
                from_kwd_id.append(kwds_name_id[from_kwd_name])
                to_kwd_id.append(kwds_name_id[kwd])
                to_kwd_count.append(from_kwd_name_full_description.count(kwd))
        
        
        ## [3] to_kwd_count �� ���� ���� ������� ����
        to_kwd_id = [to_kwd_id[idx] for idx in np.argsort(to_kwd_count)[-5:][::-1]]  # ���� 5�� �̿�
        to_kwd_count = sorted(to_kwd_count, reverse=True)[:5]
        from_kwd_id = from_kwd_id[:len(to_kwd_count)]  # 5�� ���� ���� ���� �����Ƿ�!
        
        ## [4]  result list�� �ֱ�
        result_from_kwd_id.extend(from_kwd_id)
        result_to_kwd_id.extend(to_kwd_id)
        result_to_kwd_count.extend(to_kwd_count)
        
        
        
    # 3. ����� ������ ������ �����
    result_df = pd.DataFrame({'from_kwd_id': result_from_kwd_id, 'to_kwd_id': result_to_kwd_id, 'to_kwd_count': result_to_kwd_count})

    # 4.return_dict�� �ֱ�
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

    
## [4] 10�� �̻��� ��簡 �����ϴ� Ű����� ��� ��������
### (1) ���ó�¥ ��������
today = datetime.datetime.now() + datetime.timedelta(hours=9)
today = today.date().strftime('%Y%m%d')

### (2) ������ ��������
over_10_article_df = pd.read_csv(f'/home/ubuntu/data/rel_kwd/{today}_over_10_article_df.csv')


### (3) over_10_kwd_lst ����
over_10_kwd_lst = list(over_10_article_df.from_kwd_name.unique())


'''
# 2. DB �����ϱ�
host="k7d102.p.ssafy.io:3306"
user="ssafy"
password="j^8t21e-3fuh"
password = urllib.parse.quote_plus(password)  # Ư������ ������, parse ����� ��
database="easssue_data"

db_connection_str = f'mysql+pymysql://{user}:{password}@{host}/{database}'
db_connection = create_engine(db_connection_str)
conn = db_connection.connect()
'''


# 3. ���� Ű���� �����ϱ�
## [1] ��Ƽ ���μ���
import multiprocessing
n = 100

if __name__ == '__main__':
    processes = []
    manager = multiprocessing.Manager()
    return_dict_over_10 = manager.dict()     # ����� ����
    for i in range(n):
        start = int((len(over_10_kwd_lst)//n)*i)
        end = int((len(over_10_kwd_lst)//n)*(i+1))

        p = multiprocessing.Process(target=over_10_rel_kwd_search, args=(over_10_kwd_lst[start:end], i, return_dict_over_10)) ## �� ���μ����� �۾��� ��� ## ���ڷ� db�� ���� kwd�� ������ �� 
        p.start()
        processes.append(p)
 
    for process in processes:
        process.join()



print('����Ű���� �м� ��Ƽ���μ��� �Ϸ�!')

    

    
# 4. Local�� �����ϱ�

## [1] ����� DF �����
rel_kwd_df = pd.DataFrame()

## [2] �޾ƿ� �� �ϳ��� ��ġ��
for i in range(len(return_dict_over_10)):
    cur_df = return_dict_over_10.items()[i][1]
    rel_kwd_df = pd.concat([rel_kwd_df, cur_df], ignore_index=True)



print('rel_kwd_df�� columns : ',rel_kwd_df.columns)    
    


## [3] Ȯ�ο�
rel_kwd_df.to_csv(f'/home/ubuntu/data/rel_kwd/{today}_rel_kwd_over_10.csv', index=False, header=True)
print(f'10�� �̻��� ��簡 �����ϴ� Ű������� ����Ű���带 Local�� ���� ���� : {today}_rel_kwd_over_10.csv')



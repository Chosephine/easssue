# -*- coding: cp949 -*-
from konlpy.tag import Mecab
from collections import Counter
import pandas as pd
import pickle
import mysql.connector
import copy



# 1. Ű���� �����ϴ� �Լ� ����
from tqdm import tqdm
''' sorted_kwds_lst �� �Ʒ� �÷�, ( count ���� ��, ���ڱ��� ª�� �� ) ���� ���� ��
[('475335', '������', 10), ('475335', '����', 7), ('475335', '������', 6), ('475335', '��õ', 4), ('475335', '�糭', 4), ('475335', '����', 4), ('475335', '������', 4), ('475335', '�̷�', 3), ('475335', '����', 2), ('475335', '��ǳ', 2), ('475335', 'Ȳ��', 2), ('475335', '����', 2), ('475335', '����', 2), ('475335', '�л�', 2), ('475335', '����', 2), ('475335', '����', 2), ('475335', '����', 2), ('475335', '����', 2), ('475335', '����', 2), ('475335', '������ �м�', 2), ('475335', '����', 1), ('475335', '����', 1), ('475335', '���', 1), ('475335', '����', 1), ('475335', '�Ҿ�', 1), ('475335', '����', 1), ('475335', '����', 1), ('475335', '��õ', 1), ('475335', '���б�', 1), ('475335', '���丮�ڸ�', 1)]

'''
def preprocessing1(sorted_kwds_lst):
    delete_set = set()
    for i in tqdm(range(len(sorted_kwds_lst)-1)):
        kwd1, cnt1 = sorted_kwds_lst[i]
        for j in range(i+1, len(sorted_kwds_lst)):
            kwd2, cnt2 = sorted_kwds_lst[j]
            
            # kwd1�� ������ �ȵȴٸ� break
            if (cnt1*0.65 >= cnt2):
                break

            if kwd1 in kwd2: #and (cnt1*0.65 <= cnt2):
                delete_set.add(kwd1)
                # kwd1�� ���� Ȯ���̹Ƿ� ���� ������ �̵�
                break
    # print(f'��ü {len(sorted_kwds_lst)} ��, {len(delete_set)} ���� ������� ��!')

    return delete_set










# 2. ��Ÿ���� �������� 
meta_df = pd.read_csv('/home/ubuntu/data/meta.csv')
print('-'*50)
print('meta data is ' )
print(meta_df)
print('-'*50)
    

max_article_id, article_filedate, article_try, kwd_filedate, kwd_try = meta_df.loc[0,['max_article_id','article_filedate', 'article_try', 'kwd_filedate', 'kwd_try']]
article_try = str(article_try).zfill(2)  # 01�� ���� �������� ����� �ֱ� 
kwd_try = str(kwd_try).zfill(2)          # 01�� ���� �������� ����� �ֱ�


# 3. Data ��������
article_df = pd.read_csv(f'/home/ubuntu/data/article/{article_filedate}_{article_try}_article_db.csv')
article_df = article_df.drop_duplicates(subset=['link'])  # �ߺ� ���� 

new_kwds = pd.read_csv(f'/home/ubuntu/data/kwd/{kwd_filedate}_{kwd_try}_kwd.csv')
with open(f'/home/ubuntu/data/kwd/{kwd_filedate}_{kwd_try}_kwd_name_id.pickle', 'rb') as f:
    kwds_name_id = pickle.load(f)


# 4. Ű���� ���� ����
mecab = Mecab()


article_id_lst = []
kwd_id_lst = []
kwd_count_lst = []
for i in range(len(article_df)):
    row = article_df.iloc[i]
    article_id = row['article_id']
    desc = row['description']

    nouns = mecab.nouns(desc)
    nouns_counter = dict(Counter(nouns))

    
    ## [1] Ű���� �����ϱ�
    kwds = []
    
    ### (1) 1���� Ű����
    for kwd in new_kwds[new_kwds['kwd_name'].map(len)==1]['kwd_name']:
        if kwd in nouns:
            kwds.append( ( kwd, nouns_counter[kwd])  )
    
    
    
    
    ### (2) 2���� �̻� Ű����
    for kwd in new_kwds[new_kwds['kwd_name'].map(len)>1]['kwd_name']:
        if kwd in desc:
            #kwds.append((str(article_id), str(kwds_name_id[kwd]), desc.count(kwd)) )
            kwds.append( ( kwd, desc.count(kwd)) )
    '''
    article_id = i �� ����� �ش� ��.
    kwds = [
    (����, 31), (�̱�, 2),  �ݸ�, 9), ( keyword_name, keyword_count),  ... ��
    ]
    '''
    
    ## [2] Ű���� �����ϱ�
    ## ���� ���� �� ���� �����ϰ�, ���� Ƚ�� �������� ���ڱ��� ���� �ͺ��� ����- > [ (i, '�γ�',1923), (i, '�ڷ�', 1921), (i, '�ڷγ�', 1871), ... ,(i, '�ӽ�Ĺ',1), (i, '���θӽ�Ĺ',1) ,...] �÷� ���ĵǰ� �ϱ�! 
    
    ### (1) ���ڰ� ª�� ���� �տ� ������ ����
    sorted_kwds_lst = sorted(kwds, key=lambda item: len(item[0]), reverse=False)
    
    ### (2) count�� ���� �� ���� �տ� ������ ����
    sorted_kwds_lst = sorted(sorted_kwds_lst, key=lambda item: item[1], reverse=True)
    # print(sorted_kwds_lst)
    
    
    ### (3) ������ �� ã��
    delete_set = preprocessing1(sorted_kwds_lst)
    #print(f'������ ��� : {delete_set}')
    
    ### (4) ������ �� �����ϱ�
    
    if delete_set:   
        deleted_kwds_dict =  { kwdName_count[0] : kwdName_count[1] for kwdName_count in sorted_kwds_lst}   # { kwd_name : kwd_count } �÷� ����� 
        for delete_kwd in delete_set:  # kwd_id�� ����ִ� ����
            del deleted_kwds_dict[delete_kwd]
            
            
        
        ### (5) ���� �Ŀ� �ٽ� sorted_kwds_lst �����
        sorted_kwds_lst = sorted(deleted_kwds_dict.items(), key=lambda item: item[1], reverse=True) # kwd ���� ���� ������ ����
        #print('������ ������ ���')      
        #print(sorted_kwds_lst)
    
    
    
    ## [3] sorted_kwds_lst �����ϱ�
    ### (1) (count ���� ��, ���� �� ��) ���� �����ϱ�
    sorted_kwds_lst = sorted(sorted_kwds_lst, key=lambda item: len(item[0]), reverse=True)
    #print('���� ���̼����� ����')
    #print(sorted_kwds_lst)
    sorted_kwds_lst = sorted(sorted_kwds_lst, key=lambda item: item[1], reverse=True)
    ''' ( count ��, ���ڱ��� �� ��) ���� 
    sorted_kwds_lst =
    [('������', 10), ('������', 6), ('������', 4), ('��õ', 4), ('�糭', 4), ('����', 4), ('�̷�', 3), ('������ �м�', 2), ('����', 2), ('����', 2), ('��ǳ', 2), ('Ȳ��', 2), ('����    ', 2), ('����', 2), ('�л�', 2), ('����', 2), ('����', 2), ('����', 2), ('����', 2), ('���丮�ڸ�', 1), ('���б�', 1), ('����', 1), ('����', 1), ('���', 1), ('����', 1), ('�Ҿ�', 1    ), ('����', 1), ('����', 1), ('��õ', 1)]

    '''
    #print()
    #print('count ������ ����')
    #print(sorted_kwds_lst)
    
    
    
    ## [4] DB�� ���� �������� �ٲٱ�
    
    if sorted_kwds_lst: # �����Ͱ� �����Ѵٸ�
        ### (1) kwds_name_id �̿��ؼ� kwd_name -> kwd_id�� ��ȯ
        ### (2) 10�� ���Ϸ� �߶� �־��ֱ�        
        article_kwd_count = list(zip(*sorted_kwds_lst))
        cur_kwd_id_lst = [kwds_name_id[kwd_name] for kwd_name in article_kwd_count[0][:10]] # 10���� �ڸ��� 1/2
        cur_article_id_length = len(cur_kwd_id_lst)  # list ����
        cur_article_id = [article_id]*cur_article_id_length # article_id list ����
        
        
        ### (3) DF���� �Ϳ� �־��ֱ�
        article_id_lst.extend(cur_article_id)
        kwd_id_lst.extend(cur_kwd_id_lst)        # kwd_name to kwd_id
        kwd_count_lst.extend(article_kwd_count[1][:10])  # 2/2 10���� �ڸ���
    #print()
    #print(article_id_lst)
    #print(kwd_id_lst)
    #print(kwd_count_lst)
    #break
    
    '''
    sql = "INSERT INTO article_kwd (article_id, kwd_id, kwd_count) VALUES (%s, %s, %s)"
    print(kwds)
    mycursor.executemany(sql, kwds)
    '''
    
    # print per 10
    if i % 100 == 0:
        print(f' Ű���� ���� �Ϸ�  :  {i} / {len(article_df)} : cur value is : {kwds}')
       
    
    '''
    mydb.commit()
    '''

article_kwd_df = pd.DataFrame({'article_id':article_id_lst, 'kwd_id':kwd_id_lst, 'kwd_count':kwd_count_lst })
print('-'*50,'��� df','-'*50)
print(article_kwd_df)
print('minimum ��','-'*50)
print(article_kwd_df.astype(int).min())
print('maximum ��','-'*50)
print(article_kwd_df.astype(int).max())


# 4. DB�� �ֱ�

## [1] DB�� ����
from sqlalchemy import create_engine
import pymysql
import urllib

import pandas as pd
mysql_df = pd.read_csv(f'/home/ubuntu/data/mysql.csv')
password = mysql_df.loc[0,'password']

host="k7d102.p.ssafy.io:3306"
user="ssafy"
password = urllib.parse.quote_plus(password)  # Ư������ ������, parse ����� ��
database="easssue_data"

db_connection_str = f'mysql+pymysql://{user}:{password}@{host}/{database}'
db_connection = create_engine(db_connection_str)

## [2] DB�� �ֱ�
article_kwd_df.to_sql(name='article_kwd', con=db_connection, if_exists='append',index=False)  
print('���� dataframe�� db�� �� �����ϴ�. ')



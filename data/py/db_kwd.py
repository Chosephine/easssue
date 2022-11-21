# -*- coding: cp949 -*-

# 1. DB���� max_kwd_id ��������
## [1] DB ����1
import mysql.connector
import pandas as pd
mysql_df = pd.read_csv(f'/home/ubuntu/data/mysql.csv')
password = mysql_df.loc[0,'password']
mydb = mysql.connector.connect(
  host="k7d102.p.ssafy.io",
  user="ssafy",
  password=password,
  database="easssue_data"
)

mycursor = mydb.cursor()

## [2] DB���� kwd table �������� 

mycursor.execute(f"SELECT * FROM kwd")

myresult = mycursor.fetchall()


print(myresult[-1:-20])   # [ (1, '�ؿ��౸'), (2, '����'), (3, '�������͸�'), ...]


## [3]  DB ������ �� kwd_id max�� ã�� for ���ο� Ű���尡 ������ kwd_id ã��
max_kwd_id = max(list(zip(*myresult))[0])
print('���� DB�� max_kwd_id : ', max_kwd_id)




# 2. �ֽ� kwd ��������
import pandas as pd
while True:
    kwd_filedate_kwd_try = input('local���� ������ kwd_filedate_kwd_try �� 20221109_01 �÷� �Է��ϼ��� : ')
    check = input(f'�Է��� ���� {kwd_filedate_kwd_try}�� �½��ϱ�? (y/n)')
    
    if check=='y':
        break


total_kwd_df = pd.read_csv(f'/home/ubuntu/data/kwd/{kwd_filedate_kwd_try}_kwd.csv')
new_kwd_df = total_kwd_df[total_kwd_df['kwd_id']>max_kwd_id]  # ���� �Էµ� �͵鸸 ��������
print('���� �Էµ� Ű���� �Դϴ�.')
print(new_kwd_df)




# 3. DB�� �ֱ�
## [1] DB�� ���� 
from sqlalchemy import create_engine
import pymysql
import pandas as pd
import urllib

import pandas as pd
mysql_df = pd.read_csv(f'/home/ubuntu/data/mysql.csv')
password = mysql_df.loc[0,'password']
host="k7d102.p.ssafy.io:3306"
user="ssafy"
password = urllib.parse.quote_plus(password)
database="easssue_data"

db_connection_str = f'mysql+pymysql://{user}:{password}@{host}/{database}'
# db_connection_str = f'mysql+pymysql://ssafy:j^8t21e-3fuh@k7d102.p.ssafy.io/easssue_data'
db_connection = create_engine(db_connection_str)
conn = db_connection.connect()


## [2] DB�� �ֱ�
# DB�� �ֱ�
new_kwd_df.to_sql(name='kwd', con=db_connection, if_exists='append',index=False)
print('DB�� Ű���尡 �ݿ��Ǿ����ϴ�.')


# 4. meta csv �ٲٱ�
## [1] ��Ÿ���� �������� 
meta_df = pd.read_csv('/home/ubuntu/data/meta.csv')
max_article_id, article_filedate, article_try, kwd_filedate, kwd_try = meta_df.loc[0,['max_article_id','article_filedate', 'article_try', 'kwd_filedate', 'kwd_try']]

## [2] update�� kwd_filedate, kwd_try ��������
kwd_filedate, kwd_try = kwd_filedate_kwd_try.split('_')

## [3] meta csv �����ϱ�
### (1) �� ����
meta_df['kwd_filedate'] = kwd_filedate
meta_df['kwd_try'] = kwd_try

### (2) ���� ���� Ȯ��
print(meta_df)
check = input('meta.csv �� ���� ���� �����Ͻðڽ��ϱ�? y/n : ')
if check == 'y':
    meta_df.to_csv('/home/ubuntu/data/meta.csv', header=True, index=False)
    print('meta.csv �� ����Ǿ����ϴ�. ')

else:
    print('meta.csv�� ������� �ʾ����Ƿ�, ���� Ȯ���ϼ���!')




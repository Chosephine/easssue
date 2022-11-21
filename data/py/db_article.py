# -*- coding: cp949 -*-


# 1. mysql 연결
from sqlalchemy import create_engine
import pymysql
import pandas as pd
import urllib

import pandas as pd
mysql_df = pd.read_csv(f'/home/ubuntu/data/mysql.csv')
password = mysql_df.loc[0,'password']
host="k7d102.p.ssafy.io:3306"
user="ssafy"
password = urllib.parse.quote_plus(password)  # 특수문자 때문에, parse 해줘야 함
database="easssue_data"

db_connection_str = f'mysql+pymysql://{user}:{password}@{host}/{database}'
db_connection = create_engine(db_connection_str)
conn = db_connection.connect()

'''
import mysql.connector
from mysql.connector import IntegrityError
from _mysql_connector import MySQLInterfaceError

mydb = mysql.connector.connect(
  host="k7d102.p.ssafy.io",
  user="ssafy",
  password="j^8t21e-3fuh",
  database="easssue_data"
)

mycursor = mydb.cursor()


sql = "INSERT INTO article (article_id, category_id, title, link, pub_date, hit, summary, img) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
'''







# 2. 데이터 로드

import pandas as pd
meta_df = pd.read_csv('/home/ubuntu/data/meta.csv')
print('-'*50)
print('meta data is ' )
print(meta_df)
print('-'*50)
    
# 메타정보 가져오기 
max_article_id, article_filedate, article_try, kwd_filedate, kwd_try = meta_df.loc[0,['max_article_id','article_filedate', 'article_try', 'kwd_filedate', 'kwd_try']]
article_try = str(article_try).zfill(2)  # 01과 같은 형식으로 만들어 주기 
kwd_try = str(kwd_try).zfill(2)          # 01과 같은 형식으로 만들어 주기


article_df = pd.read_csv(f'/home/ubuntu/data/article/{article_filedate}_{article_try}_article_db.csv')
article_df = article_df[['article_id', 'category_id', 'from_kwd_id' ,'title', 'link', 'pub_date', 'hit', 'summary', 'img']]

'''
num_of_duplicated_article = sum(article_df.duplicated(subset=['link']))
print(f'전체 {len(article_df)}개의 기사 중, { num_of_duplicated_article } 개의 중복 기사가 삭제되었습니다.')

article_df = article_df.drop_duplicates(subset=['link'])
'''

# 3. 데이터 insert
article_df.to_sql(name='article', con=db_connection, if_exists='append',index=False)  

'''
for article_id, category_id, title, link, pub_date, hit, summary, img in article_pdf.values:
    category_id = str(category_id)
    val = (article_id, category_id, title, link, pub_date, hit, summary, img)
    
    try :
        mycursor.execute(sql, val)
        print(article_id, category_id, title, link, pub_date, hit, summary, img, "record inserted")
        
    except IntegrityError as e:
        print("error is : ", e, "category is : ", article_id, category_id, title, link, pub_date, hit, summary, img)


mydb.commit()
'''






print(f'----------article {len(article_df)}개 insert 완료----------')
print(f'article_id의 최소값 : {article_df.article_id.min()}, article_id 의 최대값 : {article_df.article_id.max()}')



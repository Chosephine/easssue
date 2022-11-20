# -*- coding: cp949 -*-

# 1. DB에서 max_kwd_id 가져오기
## [1] DB 연결1
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

## [2] DB에서 kwd table 가져오기 

mycursor.execute(f"SELECT * FROM kwd")

myresult = mycursor.fetchall()


print(myresult[-1:-20])   # [ (1, '해외축구'), (2, '성장'), (3, '보조배터리'), ...]


## [3]  DB 데이터 중 kwd_id max값 찾기 for 새로운 키워드가 시작할 kwd_id 찾기
max_kwd_id = max(list(zip(*myresult))[0])
print('현재 DB의 max_kwd_id : ', max_kwd_id)




# 2. 최신 kwd 가져오기
import pandas as pd
while True:
    kwd_filedate_kwd_try = input('local에서 가져올 kwd_filedate_kwd_try 를 20221109_01 꼴로 입력하세요 : ')
    check = input(f'입력한 값이 {kwd_filedate_kwd_try}가 맞습니까? (y/n)')
    
    if check=='y':
        break


total_kwd_df = pd.read_csv(f'/home/ubuntu/data/kwd/{kwd_filedate_kwd_try}_kwd.csv')
new_kwd_df = total_kwd_df[total_kwd_df['kwd_id']>max_kwd_id]  # 새로 입력된 것들만 가져오기
print('새로 입력된 키워드 입니다.')
print(new_kwd_df)




# 3. DB에 넣기
## [1] DB와 연결 
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


## [2] DB에 넣기
# DB에 넣기
new_kwd_df.to_sql(name='kwd', con=db_connection, if_exists='append',index=False)
print('DB에 키워드가 반영되었습니다.')


# 4. meta csv 바꾸기
## [1] 메타정보 가져오기 
meta_df = pd.read_csv('/home/ubuntu/data/meta.csv')
max_article_id, article_filedate, article_try, kwd_filedate, kwd_try = meta_df.loc[0,['max_article_id','article_filedate', 'article_try', 'kwd_filedate', 'kwd_try']]

## [2] update할 kwd_filedate, kwd_try 가져오기
kwd_filedate, kwd_try = kwd_filedate_kwd_try.split('_')

## [3] meta csv 저장하기
### (1) 값 변경
meta_df['kwd_filedate'] = kwd_filedate
meta_df['kwd_try'] = kwd_try

### (2) 저장 여부 확인
print(meta_df)
check = input('meta.csv 를 위와 같이 수정하시겠습니까? y/n : ')
if check == 'y':
    meta_df.to_csv('/home/ubuntu/data/meta.csv', header=True, index=False)
    print('meta.csv 가 저장되었습니다. ')

else:
    print('meta.csv가 저장되지 않았으므로, 직접 확인하세요!')




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




# 1. DB와 연결하기
mysql_df = pd.read_csv(f'/home/ubuntu/data/mysql.csv')
password = mysql_df.loc[0,'password']

host="k7d102.p.ssafy.io:3306"
user="ssafy"
password = urllib.parse.quote_plus(password)  # 특수문자 때문에, parse 해줘야 함
database="easssue_data"

db_connection_str = f'mysql+pymysql://{user}:{password}@{host}/{database}'
db_connection = create_engine(db_connection_str)
conn = db_connection.connect()


#2. Local에서 DB에 넣을 데이터 가져오기
## [1] 오늘날짜 가져오기
today = datetime.datetime.now() + datetime.timedelta(hours=9)
today = today.date().strftime('%Y%m%d')

## [2] 데이터 가져오기
rel_kwd_df = pd.read_csv(f'/home/ubuntu/data/rel_kwd/{today}_rel_kwd.csv')
print('local에서 데이터를 잘 가져왔습니다.')


#3. DB에 넣기
#rel_kwd_df.to_sql(name='rel_kwd', con=db_connection, if_exists='append',index=False)
print('DB에 데이터가 잘 들어갔습니다.')
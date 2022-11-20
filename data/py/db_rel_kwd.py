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




# 1. DB�� �����ϱ�
mysql_df = pd.read_csv(f'/home/ubuntu/data/mysql.csv')
password = mysql_df.loc[0,'password']

host="k7d102.p.ssafy.io:3306"
user="ssafy"
password = urllib.parse.quote_plus(password)  # Ư������ ������, parse ����� ��
database="easssue_data"

db_connection_str = f'mysql+pymysql://{user}:{password}@{host}/{database}'
db_connection = create_engine(db_connection_str)
conn = db_connection.connect()


#2. Local���� DB�� ���� ������ ��������
## [1] ���ó�¥ ��������
today = datetime.datetime.now() + datetime.timedelta(hours=9)
today = today.date().strftime('%Y%m%d')

## [2] ������ ��������
rel_kwd_df = pd.read_csv(f'/home/ubuntu/data/rel_kwd/{today}_rel_kwd.csv')
print('local���� �����͸� �� �����Խ��ϴ�.')


#3. DB�� �ֱ�
#rel_kwd_df.to_sql(name='rel_kwd', con=db_connection, if_exists='append',index=False)
print('DB�� �����Ͱ� �� �����ϴ�.')
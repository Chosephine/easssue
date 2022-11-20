# -*- coding: cp949 -*-



import mysql.connector
from mysql.connector import IntegrityError
from _mysql_connector import MySQLInterfaceError
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


sql = "INSERT INTO category (category_id, category_name) VALUES (%s, %s)"

name_id = {'IT/과학': 1, '경제':2 ,  '문화/생활' : 3 , '미용/건강':4,   '사회':5, '스포츠':6, '연예':7, '정치':8}

for category_name, category_id in name_id.items():
    category_id = str(category_id)
    val = (category_id, category_name)
    
    try :
        mycursor.execute(sql, val)
        print(category_id, category_name, "record inserted")
        
    except IntegrityError as e:
        print("error is : ", e, "category is : ", category_id, cateogory_name)



mydb.commit()
print('insert 완료')



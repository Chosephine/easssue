# -*- coding: cp949 -*-
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


# 1. 원하는 table 선택
table_name = input('category : 1 / article : 2 / kwd : 3  / article_kwd : 4 / rel_kwd :5 / rec_kwd : 6 \ninput number! : ')

table_num_to_name = {'1' : 'category', '2' : 'article', '3' : 'kwd' , '4': 'article_kwd', '5': 'rel_kwd', '6': 'rec_kwd'  }

table_name = table_num_to_name[table_name]
print(table_name)



# 2. 원하는 query 문 선택
query = input('pk 작은 순으로 20개 보기 : 1 / pk 큰 순으로 20개 보기 : 2 / 전체 개수보기 : 3 \n input number ! : ')
if query == '1':
    query_sentence = f'SELECT * FROM {table_name} LIMIT 20'
elif query == '2':
    query_sentence = f'SELECT * FROM {table_name} ORDER BY {table_name}_id DESC LIMIT 20'
    
elif query == '3':
    query_sentence = f'SELECT count(*) FROM {table_name} '    
    
# mycursor.execute(f"SELECT * FROM {table_name} LIMIT 20")
mycursor.execute(query_sentence)

myresult = mycursor.fetchall()

'''
print(type(myresult))

print(list(zip(*myresult)))

print(len(myresult))

for i in range(len(myresult)):
    print(type(myresult[i]))
    print(myresult[i])

'''
for x in myresult:
    print(x)


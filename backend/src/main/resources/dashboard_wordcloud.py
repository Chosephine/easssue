# -*- coding: cp949 -*- 

import sys,os
import mysql.connector
import datetime
from wordcloud import WordCloud
import numpy as np
import matplotlib.pyplot as plt
import json

def color_func(word, font_size, position,orientation,random_state=None, **kwargs):
    return("hsl({:d},{:d}%, {:d}%)".format(np.random.randint(180,220),np.random.randint(70,90),np.random.randint(50,70)))

def get_user_word(user_id, cursor):
    today = datetime.datetime.now() + datetime.timedelta(hours=9)
    week_ago = today - datetime.timedelta(days=7)
    today = today.date().strftime('%Y-%m-%d')
    week_ago = week_ago.date().strftime('%Y-%m-%d')

    query = f"""
    select k.kwd_name, ak.kwd_count
    from kwd k
    join article_kwd ak on k.kwd_id=ak.kwd_id
    join article a on ak.article_id=a.article_id
    join article_log al on a.article_id=al.article_id
    where al.user_id={user_id} and al.click_time between '{week_ago}' and '{today}';
    """

    cursor.execute(query)

    result = cursor.fetchall()

    return result

def main(argv):
    if not os.path.exists('src/main/resources/img/dash'):
        os.mkdir('src/main/resources/img/dash')

    user_id = argv[1]

    # --------------------------
    base_dir=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    secret_file=os.path.join(base_dir,'resources/secrets.json')

    with open(secret_file) as f:
        secrets=json.loads(f.read())

    def get_secret(key, secrets=secrets):
        return secrets[key]

    mysql_pwd=get_secret("mysql_pwd")
    # --------------------------

    mydb = mysql.connector.connect(
        host="k7d102.p.ssafy.io",
        user="ssafy",
        password=mysql_pwd,
        database="easssue_data"
    )

    mycursor = mydb.cursor()

    user_vocab_lst = get_user_word(user_id, mycursor)
    user_vocab_lst.sort(key=lambda x: x[1], reverse=True)
    user_vocab_lst = dict(user_vocab_lst[:25])

    ### 워드 클라우드 제작
    wc = WordCloud(background_color='white', font_path='src/main/resources/SB 어그로 B.ttf', color_func=color_func, width=945, height=241)
    wc.generate_from_frequencies(user_vocab_lst)
    
    ## 파일로 저장
    now = datetime.datetime.now().strftime('%Y-%m-%d_%H:%M:%S:%f')
    wc.to_file(f'src/main/resources/img/dash/{now}.png')

    ## show
    # figure = plt.figure(figsize=(12, 12))
    # ax = figure.add_subplot(1, 1, 1)
    # ax.axis('off')
    # ax.imshow(wc)
    # plt.show()
    print(now)
    
    return now

if __name__ == '__main__':
    main(sys.argv)
# -*- coding: cp949 -*-
### import
import sys, os
import numpy as np
import pandas as pd
import datetime
from tqdm import tqdm
import time

from konlpy.tag import Mecab
from sklearn.feature_extraction.text import TfidfVectorizer

from newspaper import Article
import kss
import re

from wordcloud import WordCloud
from collections import Counter
from scipy.linalg import solve

## data load
import pandas as pd
meta_df = pd.read_csv('/home/ubuntu/data/meta.csv')

print('-'*50)
print('meta data is ' )
print(meta_df)
print('-'*50)

max_article_id, article_filedate, article_try = meta_df.loc[0,['max_article_id','article_filedate','article_try']]
article_try = str(article_try).zfill(2)
original_df = pd.read_csv(f'/home/ubuntu/data/article/{article_filedate}_{article_try}_article.csv')
df = original_df.drop_duplicates(subset=['link'])

num_of_duplicated_article = len(df)
print(f'��ü {len(original_df)}���� ��� ��, { num_of_duplicated_article } ���� �ߺ� ��簡 �����Ǿ����ϴ�.')


## stopword
with open('/home/ubuntu/data/stopwords.txt', 'r') as f:
    stopwords_lst = f.readlines()    # line 1�� ¥���� �̷���� ��
    stopwords_str = stopwords_lst[0]
    stopwords_str = stopwords_str.split()
    stopwords_set = set(stopwords_str)
    


### description �Է� �� 3�� ��� ��ȯ
def desc_to_summary(description):
    remove_tag = re.compile('<.*?>')
    description = re.sub(remove_tag, '', description)
    ## ��� ���� �ٱ� -> ���� �������ֱ�
    description = kss.split_sentences(description.replace('\n\n', ' '))
    # print(description)

    ### ���� ���ȭ
    ## �ҿ�� ����, ���� 1�� �ܾ� ����
    mecab = Mecab()
    def get_nouns(sentences):
        nouns = []
        for sentence in sentences:
            if sentence != '':
                nouns.append(' '.join([noun for noun in mecab.nouns(str(sentence))
                                    if noun not in stopwords_set and len(noun) > 1]))
        return nouns

    ### ��� ������ ��� ���� ��� ����
    ## ex : [['����', '�ٶ�', ...], ['�ٻ�', '����', '��īŸ����', ...], ...]
    news_nouns = get_nouns(description)

    #################################### TextRank ####################################

    ### TF-IDF �� �� �׷��� ���� : �ܾ�� �ܾ� ������ ����ġ
    tfidf = TfidfVectorizer()
    def build_sent_graph(sentence):
        tfidf_mat = tfidf.fit_transform(sentence).toarray()
        graph_sentence = np.dot(tfidf_mat, tfidf_mat.T)
        return graph_sentence

    ## ex
    ## [[1. 0.20095813 0. ... 0. 0. 0. ]
    ## [0.20095813 1. 0.09674027 ... 0. 0. 0. ]
    ## [0. 0.09674027 1. ... 0.03337874 0. 0. ]
    ## ...
    ## [0. 0. 0.03337874 ... 1. 0. 0. ]
    ## [0. 0. 0. ... 0. 1. 0. ]
    ## [0. 0. 0. ... 0. 0. 1. ]]
    try:
        sent_graph=build_sent_graph(news_nouns)
    except:
        return np.nan
    
    
    ### TextRank �� ���ϱ�
    ## d�� damping facter��, �� vertex���� �ٸ� vertex�� ����� Ȯ��
    def get_ranks(graph, d=0.85): 
        A = graph
        matrix_size = A.shape[0]
        for id in range(matrix_size):
            A[id, id] = 0 
            link_sum = np.sum(A[:,id]) 
            if link_sum != 0:
                A[:, id] /= link_sum
            A[:, id] *= -d
            A[id, id] = 1

        B = (1-d) * np.ones((matrix_size, 1))
        ranks = solve(A, B)
        return {idx: r[0] for idx, r in enumerate(ranks)}

    ### ����ġ �׷����� get_ranks �Լ��� ���� ���� �ű��
    ## ex
    ## {0: 0.9559671008853996,
    ## 1: 1.3002149462559782,
    ## 2: 1.639021060550871,
    ## 3: 0.9843074628398639,
    ## 4: 1.242104677385347,
    ## ...}
    sent_rank_idx = get_ranks(sent_graph)

    ### ������ ū ������ �ε����� ����
    sorted_sent_rank_idx = sorted(sent_rank_idx, key=lambda k: sent_rank_idx[k], reverse=True)
    # print(sorted_sent_rank_idx)

    ### ����� ������ ���� �Է��ϸ� �� ������ ������ŭ ������ִ� �Լ�
    def summarize(sent_num):
        summary = []
        index=sorted_sent_rank_idx[:sent_num]
        index.sort()
        # print(index)
        for idx in index:
            summary.append(description[idx])
        # print(summary)
        return '\n'.join(summary)[:300]


    return summarize(3)

def get_summary(df, processor_idx, return_dict):
    summary = []
    for i in tqdm(range(len(df))):
        summary.append(desc_to_summary(df.iloc[i, 8]))  # 8�� column�� desccription��
    df['summary'] = summary
    
    return_dict[processor_idx] = df
    time.sleep(1)
    return

# ��Ƽ ���μ���
import multiprocessing
n = 200

if __name__ == '__main__':
    processes = []
    manager = multiprocessing.Manager()
    return_dict = manager.dict()     # ����� ����
    for i in tqdm(range(n)):
        start = int((len(df)//n)*i)
        end = int((len(df)//n)*(i+1))
        p = multiprocessing.Process(target=get_summary, args=(df[start:end], i, return_dict)) ## �� ���μ����� �۾��� ���
        p.start()
        processes.append(p)
 
    for process in processes:
        process.join()

# ����� DF �����
article_df = pd.DataFrame()

## �޾ƿ� �� �ϳ��� ��ġ��
for i in range(len(return_dict)):
    cur_df = return_dict.items()[i][1]
    article_df = pd.concat([article_df, cur_df], ignore_index=True)


article_df.to_csv(f'/home/ubuntu/data/article/{article_filedate}_{article_try}_article_db.csv', index=False, header=True)
print(f'����� �Ϸ�Ǿ�, local�� csv������ �����߽��ϴ�.')

# -*- coding: cp949 -*-


import datetime, urllib, json, time, re
from tqdm import tqdm
import numpy as np
import pandas as pd


def news_clustering(df):
    # 1. �Ӻ���
    from sklearn.feature_extraction.text import TfidfVectorizer
    tfidf = TfidfVectorizer(ngram_range=(1,5))
    ## [1] tfidf�� �Ӻ��� ��Ű��
    try : 
        tfidf_vectors = tfidf.fit_transform(df['description'])
    
    ## [2] �Ӻ��� �����ϸ�, �� �� return �ϱ�
    except ValueError as e:
        print('�����߻�', text)
        tmp_df = pd.DataFrame({'title': [], 'link': [] , 'pub_date': [], 'description': [], 'from_kwd_name' : [], 'from_kwd_id': []})
        return tmp_df
    
    
    # 2. ����ȭ �� fitting
    from sklearn.cluster import KMeans
    k=3
    kmeans = KMeans(n_clusters=k, max_iter=10000, random_state=1115)
    kmeans_label = kmeans.fit_predict(tfidf_vectors)
    kmeans_centers = kmeans.cluster_centers_

    
    # 3. ������� �� �������� 1������ �̱� 
    
    top_features_df = pd.DataFrame() # ��� ���� ��
    top_features_idx_list = []
    
    ## [1] cluster ����, �� cluster�� ������ index�� ��������
    clusterNum_indexList = dict()   # {cluster1 : [index1, index2, ...,]} : key : cluster num, value : cluster ������ index
    for clusterNum in set(kmeans_label):  # k = 3 ������, 3������ �� ������ ���� ������ ���� �� ����
        clusterNum_indexList[clusterNum] = [idx for idx, value in enumerate(kmeans_label) if value == clusterNum]
    
    
    ## [2] �� ������ center���� �������� ���� ū ���Ҹ� ��ǥ������ ����
    from numpy.linalg import norm
    ## (1) description�� �Ӻ����� vector�� array�� �ٲٱ�
    embedded_description_vectors = tfidf_vectors.toarray()
    
    ### (2) �� cluster���� ��ȯ�ϸ�, center�� ���� ����� �� ã��
    for clusterNum, indexList in clusterNum_indexList.items():
        center = kmeans_centers[clusterNum]  # center
        center_norm = norm(center)
        max_cosine = float('-INF')       
        max_idx = -1
        #### �� clusterNum�� indexList ��θ� ��ȯ�ϸ�, ������ ���� ū �� ã��
        for idx in indexList:
            cur_cosine = np.dot(embedded_description_vectors[idx], center) / (norm(embedded_description_vectors[idx])*center_norm)
            if max_cosine < cur_cosine:
                max_cosine = cur_cosine
                max_idx = idx
                
        #### ���� center�� ����� �� �����ϱ�
        top_features_df = pd.concat([top_features_df, df.loc[[max_idx]]], axis=0)
        top_features_idx_list.append(max_idx)
    
    return top_features_df, top_features_idx_list  # center 3���� ���� ����� �� return
        
    
#---------------------------------------------------------------------------------------------------------------------------
    
    

    
def news_by_kwd(keyword_lst, processor_idx, return_dict, client_id, client_secret):
    # 1. ����� ���� ��
    title = []
    link = []
    pub_date = []
    description = []
    from_kwd_name = []
    from_kwd_id = []
    total_result_lst = [title, link, pub_date, description, from_kwd_name, from_kwd_id]
    
    # 2. �ֱ� 1�ð� �͸� ��������
    cur = datetime.datetime.now() + datetime.timedelta(hours=9)
    cur = cur.strftime('%a, %d %b %Y %H')
    one_hour_ago = today = datetime.datetime.now() + datetime.timedelta(hours=8)
    one_hour_ago = one_hour_ago.strftime('%a, %d %b %Y %H')
    target_times = {cur, one_hour_ago}
    
    
    
    # 3. Ű���� �˻��ϱ�
    for keyword in tqdm(keyword_lst):

    #num_of_kwd = len(keyword_lst)
    #for i in range(num_of_kwd):
       # keyword = keyword_lst[i]
        #if i % 5 == 0:
            #print(f'{processor_idx} :  {i}/{num_of_kwd}���� �Ϸ��')
    
        ## [1] Ű���� ���� naver api�� �˻�
        encText = urllib.parse.quote(keyword)
        url = "https://openapi.naver.com/v1/search/news.json?start=1&display=100&sort=date&query=" + encText # json ���

        request = urllib.request.Request(url)
        request.add_header("X-Naver-Client-Id",client_id)
        request.add_header("X-Naver-Client-Secret",client_secret)
        response = urllib.request.urlopen(request)
        rescode = response.getcode()
        if(rescode==200):
            response_body = response.read()
            response_dict = json.loads(response_body.decode('utf-8'))
            items = response_dict['items']
            
            
            
            ## [2] Ű���� ���� ���ʿ��� ���� ���� - keyword 1��
            
            ### (1) ������ �� ����
            cur_title = []
            cur_link = []
            cur_pub_date = []
            cur_description = []
            cur_from_kwd_name = []
            cur_from_kwd_id = []
            
            ### (2) 1�ð� �̳��� ��縸 ��������
            for item in items:
                # link�� ���ٸ� ����
                if item['originallink'] == '':
                    continue
            
                pubDate = item['pubDate']         # Mon, 24 Oct 2022 09:44:00 +0900 ��
                pubDate = pubDate.split(':')[0]   # Mon, 24 Oct 2022 09 ��

                if pubDate in target_times:
                    #### ������ ��ó���ϱ�   
                    remove_tag = re.compile(r"<.*?>")  # ���ʿ��� �±� �� ����
                    desc = re.sub(remove_tag, '', item['description'])
                    cur_description.append(desc.replace('\n\n', ' '))

                    
                    tmp_title = re.sub(remove_tag, '', item['title'])   # items[item_index]['title']���� ���ʿ��� �±׸� ''���� ��ü
                    tmp_title = re.sub(r"&quot;", '"', tmp_title) # &quot; : "
                    tmp_title = re.sub(r"&apos;", "'", tmp_title)  # &apos; : '
                    tmp_title = re.sub(r"&lt;", '<', tmp_title)    # &lt;   : <
                    tmp_title = re.sub(r"&gt;", '>', tmp_title)    # &gt;   : >
                    tmp_title = re.sub(r"&amp;", '&', tmp_title)   # &amp;  : &
                    
                    cur_title.append(tmp_title) 
                    
                    cur_link.append(item['originallink'])
                    pDate = datetime.datetime.strptime(item['pubDate'], '%a, %d %b %Y %H:%M:%S +0900')
                    pDate = pDate.strftime('%Y-%m-%d %H:%M:%S')
                    cur_pub_date.append(pDate)
                    cur_from_kwd_name.append(keyword)
                    cur_from_kwd_id.append(kwds_name_id_dict[keyword])


            
            
            ## [3] Ű���� ���� Ŭ�����͸� �ϱ�
            ### (1) 4�� �̻��� ��簡 �����ϴ� ��� Ŭ�����͸� ����
            if len(cur_title) > 3:
                #### 1�� keyword�� ���� ���� ����� �ϳ��� ������
                cur_result_df = pd.DataFrame({'title': cur_title, 'link': cur_link, 'pub_date': cur_pub_date, 'description': cur_description, 'from_kwd_name' : cur_from_kwd_name, 'from_kwd_id': cur_from_kwd_id})
                cur_lst_lst = [cur_title, cur_link, cur_pub_date, cur_description, cur_from_kwd_name, cur_from_kwd_id]
                
                try:
                    #### Ű����1 ���� ���� ��縦 3���� �������� ������, ������ center�� ���� ������ ��縦 1���� ����
                    top_features_df, top_features_idx_list = news_clustering(cur_result_df)
                    
                    #### ��ü �����, ���õ� ��� �ֱ�
                    for max_idx in top_features_idx_list:   
                        title.append(cur_title[max_idx])
                        link.append(cur_link[max_idx])
                        pub_date.append(cur_pub_date[max_idx])
                        description.append(cur_description[max_idx])
                        from_kwd_name.append(cur_from_kwd_name[max_idx])
                        from_kwd_id.append(cur_from_kwd_id[max_idx])
                        
                        
                except ValueError as e:
                    print(e)
                    
            
            ### (2) Ŭ�����͸� �� ���� �ȵǸ�, ��簡 �����ϸ�, ��ü �ֱ�
            else:
                #### ��簡 �����Ѵٸ�, ��ü ����� �ֱ�
                if len(cur_title):
                    title.extend(cur_title)
                    link.extend(cur_link)
                    pub_date.extend(cur_pub_date)
                    description.extend(cur_description)
                    from_kwd_name.extend(cur_from_kwd_name)
                    from_kwd_id.extend(cur_from_kwd_id)
            

                    
                    
        ## [99] keyword ������ error�� ���            
        else:
            print("Error Code:" + rescode)
        
        
        ## [99] ���ÿ� �ʹ� ���� api ��û�� �����ϱ� ���ؼ�, ��� ����
        time.sleep(1)
        
        

    
    # 4. ���õ� 1�ð� �̳� ������ DataFrame���� �����
    ## [1] df�� �����
    result_df = pd.DataFrame({'title': title, 'link': link, 'pub_date': pub_date, 'description': description, 'from_kwd_name' : from_kwd_name, 'from_kwd_id': from_kwd_id})
    
    ## [2] return_dict�� �ֱ�
    return_dict[processor_idx] = result_df

    return



#-------------------------------------------------------------------------------------------------------------------------

# url �̿��ؼ�, full description�� image�� ���
from newspaper import Article
import numpy as np
import re
def url_to_article(url):
    ### url �Է� �� ��� ���� ��������
    article = Article(url, language='ko')
    # article.download()
    try:
        article.download()
        article.parse()
    except:
        return np.nan, np.nan
    remove_tag = re.compile('<.*?>')
    description = re.sub(remove_tag, '', article.text)
    description = description.replace('\n\n', ' ')
    image = article.top_image
    if description == '':
        description = np.nan
    if image == '':
        image = np.nan
    return description, image


from tqdm import tqdm
def get_description_image(df, idx, return_dict):
    description_lst = []
    image_lst = []
    for link in tqdm(df['link']):
        description, image = url_to_article(link)
        description_lst.append(description)
        image_lst.append(image)
    
    df['description'] = description_lst
    df['img'] = image_lst
    return_dict[idx] = df
    return



# csv�� �����ϱ�
def make_df_for_db(return_dict):
    # 1. ��Ÿ���� ��������
    meta_df = pd.read_csv('/home/ubuntu/data/meta.csv')
    max_article_id, article_filedate, article_try, kwd_filedate, kwd_try = meta_df.loc[0,['max_article_id','article_filedate', 'article_try', 'kwd_filedate', 'kwd_try']]
    article_try = str(article_try).zfill(2)  # 01�� ���� �������� ����� �ֱ� 
    kwd_try = str(kwd_try).zfill(2)          # 01�� ���� �������� ����� �ֱ�
    
     
    
    
    # 2. ����� DF �����
    result_df = pd.DataFrame()
    ## [1] �޾ƿ� �� �ϳ��� ��ġ��
    for i in range(len(return_dict)):
        cur_df = return_dict.items()[i][1]
        result_df = pd.concat([result_df, cur_df], axis=0)

    ## [2] DB�� ���� �������� �����ֱ�    
    result_df.dropna(subset=['description'], inplace=True)
    result_df['img'].fillna('https://k7d102.p.ssafy.io/resource/default_article_img.png', inplace=True)
    # data2null �� �����ϴ� ���� https://k7d102.p.ssafy.io/resource/default_article_img.png �� �ٲٱ� 
    
    
    ### (1) img�� �ȳ�����  list
    no_img_list = ['data2null',
    'www.goal.com/assets/low-end/ltr/favicon-16x16.png',
    'img.joongang.co.krpubimg/share/ja-opengraph-img.png',
    'segye.com/static',    # �����Ϻ��� ���, �̹����� ���� ����� ���, �����Ϻ� ��ü�� logo�� �������� �Ǵµ�, �������� ����
    'segyebiz.com/static'  # �����Ϻ��� ���, �̹����� ���� ����� ���, �����Ϻ� ��ü�� logo�� �������� �Ǵµ�, �������� ����
    ]
    van = '|'.join(no_img_list)
    result_df.loc[result_df['img'].str.contains(van), 'img'] = 'https://k7d102.p.ssafy.io/resource/default_article_img.png'
    
    # https://www.goal.com/assets/low-end/ltr/favicon-16x16.png
    # https://img.joongang.co.krpubimg/share/ja-opengraph-img.png
    
    result_df['article_id'] = range(max_article_id+1, max_article_id+len(result_df)+1)
    result_df['category_id'] = -1
    result_df['hit'] = 0
    result_df['summary'] = '.'
    result_df = result_df[['article_id', 'category_id', 'title', 'link', 'pub_date', 'hit', 'summary', 'img', 'description' ,'from_kwd_name' , 'from_kwd_id']]
    
    
    ## [3] meta.csv �ٲٱ� :  update article_filedate & article_try
    import datetime
    today = datetime.datetime.now() + datetime.timedelta(hours=9)
    today = today.strftime('%Y%m%d')
    if today == str(article_filedate):
        # article_try�� 1�� �߰��ϱ�
        article_try = int(article_try) + 1
        article_try = str(article_try).zfill(2)
    
    else:
        # article_filedate�� today�� �ٲٱ�
        article_filedate = today
        article_try = str(1).zfill(2)
    
    ## [4] result_df�� csv�� �����ϱ�
    result_df.to_csv(f'/home/ubuntu/data/article/{article_filedate}_{article_try}_article.csv', index=False, header=True)
    print(f'aritlce {len(result_df)}���� csv�� �� ����Ǿ����ϴ�.')
    
    ## [5] meta.csv ����
    meta_df.loc[0,'max_article_id'] = max_article_id+len(result_df) # �־��ּ���
    meta_df.loc[0,'article_filedate'] = article_filedate
    meta_df.loc[0,'article_try'] = article_try
    meta_df.to_csv('/home/ubuntu/data/meta.csv', header=True, index=False)
    print('meta.csv �� ������Ʈ �Ǿ����ϴ�.')

    return


#--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# 1. ��Ÿ���� �������� 
import pandas as pd
meta_df = pd.read_csv('/home/ubuntu/data/meta.csv')
    
print('-'*50)
print('meta data is ' )
print(meta_df)
print('-'*50)

max_article_id, article_filedate, article_try, kwd_filedate, kwd_try = meta_df.loc[0,['max_article_id','article_filedate', 'article_try', 'kwd_filedate', 'kwd_try']]
article_try = str(article_try).zfill(2)  # 01�� ���� �������� ����� �ֱ� 
kwd_try = str(kwd_try).zfill(2)          # 01�� ���� �������� ����� �ֱ�

# 2. Ű���� ��������
import pickle
with open(f'/home/ubuntu/data/kwd/{kwd_filedate}_{kwd_try}_kwd_name_id.pickle', 'rb') as f:
    kwds_name_id_dict = pickle.load(f)  # { kwd_name : kwd_id } �÷� ������� { ���� : 2 }        

kwd_lst = list(kwds_name_id_dict)
#kwd_lst = kwd_lst[:20]
print('Ű���� ���� : ',len(kwd_lst))


# 3. naver api
import pandas as pd

client_df = pd.read_csv('/home/ubuntu/data/naver_api.csv')

client_id_lst = client_df.client_id.tolist()
client_secret_lst = client_df.client_secret.tolist()


# 4. Ű����� ��簡������
import multiprocessing
n = 10*len(client_id_lst)
if __name__ == '__main__':
    processes = []
    manager = multiprocessing.Manager()
    return_dict = manager.dict()     # ����� ����
    for i in range(n):
        start = int((len(kwd_lst)//n)*i)
        end = int((len(kwd_lst)//n)*(i+1))
        client_id = client_id_lst[i//10]
        client_secret = client_secret_lst[i//10]
        p = multiprocessing.Process(target=news_by_kwd, args=(kwd_lst[start:end], i ,return_dict, client_id, client_secret)) ## �� ���μ����� �۾��� ���
        p.start()
        processes.append(p)
 
    for process in processes:
        process.join()

# print(return_dict)
print('Ű����α�縦 �� �����Խ��ϴ�.')
print('-'*100)
print('����� description�� img�� �����ɴϴ�.')

        
# 5. ��� description�� img ��������
import multiprocessing

## [1] 2���� ������ �ϱ�
start1 = 0
end1 = n//2

start2 = n//2
end2 = n

### (1) first
if __name__ == '__main__':
    processes = []
    manager = multiprocessing.Manager()
    for i in range(start1, end1):
        p = multiprocessing.Process(target=get_description_image, args=(return_dict[i], i, return_dict )) ## �� ���μ����� �۾��� ���
        p.start()
        processes.append(p)
 
    for process in processes:
        process.join()
        
        
print('����� description�� img�� �� �����Խ��ϴ�. 1/2')
print('-'*100)       


### (2) second
if __name__ == '__main__':
    processes = []
    manager = multiprocessing.Manager()
    for i in range(start2, end2):
        p = multiprocessing.Process(target=get_description_image, args=(return_dict[i], i, return_dict )) ## �� ���μ����� �۾��� ���
        p.start()
        processes.append(p)
 
    for process in processes:
        process.join()
        
        
print('����� description�� img�� �� �����Խ��ϴ�. 2/2')
print('-'*100)       



# 6. csv�� �����ϱ�
make_df_for_db(return_dict)

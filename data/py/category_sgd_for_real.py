# -*- coding: cp949 -*-

# 추가할 것 : 불용어, 더 좋은 모델, article 가져오는 파일과 column명 신경쓰기

from sklearn.model_selection import GridSearchCV
import numpy as np
from sklearn.linear_model import SGDClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import joblib
import pandas as pd
from konlpy.tag import Mecab

# load
## mecab load
mecab = Mecab()


## model load
model_filedate = '20221102'
count_vec = joblib.load(f'/home/ubuntu/py/models/{model_filedate}_total_count_vec.pkl') 
tfidf_transformer = joblib.load(f'/home/ubuntu/py/models/{model_filedate}_total_tfidf_transformer.pkl') 
best_sgd_model = joblib.load(f'/home/ubuntu/py/models/{model_filedate}_total_best_sgd_model.pkl')


## data load
import pandas as pd
meta_df = pd.read_csv('/home/ubuntu/data/meta.csv')

print('-'*50)
print('meta data is ' )
print(meta_df)
print('-'*50)

max_article_id, article_filedate, article_try = meta_df.loc[0,['max_article_id','article_filedate','article_try']]
article_try = str(article_try).zfill(2)
df = pd.read_csv(f'/home/ubuntu/data/article/{article_filedate}_{article_try}_article.csv')
n = len(df)



# data preprocess ----------------------------------------------------------------------------------------------------

## stopword
with open('/home/ubuntu/data/stopwords.txt', 'r') as f:
    stopwords_lst = f.readlines()    # line 1개 짜리로 이루어져 있
    stopwords_str = stopwords_lst[0]
    stopwords_str = stopwords_str.split()
    stopwords_set = set(stopwords_str)
    

## define tokenizing function
def preprocessing(text, tokenizer):
    # 몇 개 진행됐는지 확인할 때!
    global processed_num
    processed_num += 1
    
    if processed_num % 50 == 0:
        print( f'현재 진행정도 :  {processed_num} / {n}'  )
    

    # tokenizing
    text = tokenizer.nouns(text)
    #print('명사로 토크나이징 완료')

    # removing stopwords
    text = [word for word in text if word not in stopwords_set]
    #print('불용어 처리 완료')
    
    text = ' '.join(text)
    #print('텍스트 조인 완료')

    return text
    





tokenizer_lst = [mecab]

## 현재 mecab만 존재
def make_tokenized_column(df, column_name, tokenizer_lst):
    global processed_num
    
    for tokenizer in tokenizer_lst:
        tokenizer_name = str(tokenizer).split('.')[2][1:] 
        new_column_name = tokenizer_name + '_' + column_name
        df[new_column_name] = df[column_name].apply(preprocessing, args=(tokenizer,))
    
    return


        
        
## do tokenizing

### re 1 : title and description
x_test = pd.DataFrame()
x_test['description'] = df['description'].astype(str).str.replace("[^ㄱ-ㅎ ㅏ-ㅣ 가-힣 a-z A-Z]", " ")
print('x_test의 길이 : ', len(x_test))


### add mecab description column
processed_num = 0
make_tokenized_column(x_test, 'description', tokenizer_lst)



## tfidf & embedding
tokenizer_lst = [mecab]

x_test = x_test['description']
x_test_count =  count_vec.transform(x_test)
x_test_tfidf =  tfidf_transformer.transform( x_test_count )


# prediction ----------------------------------------------------------------------------------------------------
pred = best_sgd_model.predict(x_test_tfidf)

print('df의 길이 : ', len(df), '예측값 길이 : ', len(pred))

 
        
 
# csv에 넣기

def categoryName_to_categoryId(name : str):
    category_dict = {'IT/과학': 1, '경제':2 ,  '문화/생활' : 3 , '미용/건강':4,   '사회':5, '스포츠':6, '연예':7, '정치':8}
    id = category_dict[name]
    return id
    

df['category_id'] = pred
df['category_id'] = df['category_id'].apply(categoryName_to_categoryId)

df.to_csv(f'/home/ubuntu/data/article/{article_filedate}_{article_try}_article.csv', index=False, header=True)

   
        
        
        
        
        
        
        
        
        
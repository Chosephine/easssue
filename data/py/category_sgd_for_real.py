# -*- coding: cp949 -*-

# �߰��� �� : �ҿ��, �� ���� ��, article �������� ���ϰ� column�� �Ű澲��

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
    stopwords_lst = f.readlines()    # line 1�� ¥���� �̷���� ��
    stopwords_str = stopwords_lst[0]
    stopwords_str = stopwords_str.split()
    stopwords_set = set(stopwords_str)
    

## define tokenizing function
def preprocessing(text, tokenizer):
    # �� �� ����ƴ��� Ȯ���� ��!
    global processed_num
    processed_num += 1
    
    if processed_num % 50 == 0:
        print( f'���� �������� :  {processed_num} / {n}'  )
    

    # tokenizing
    text = tokenizer.nouns(text)
    #print('���� ��ũ����¡ �Ϸ�')

    # removing stopwords
    text = [word for word in text if word not in stopwords_set]
    #print('�ҿ�� ó�� �Ϸ�')
    
    text = ' '.join(text)
    #print('�ؽ�Ʈ ���� �Ϸ�')

    return text
    





tokenizer_lst = [mecab]

## ���� mecab�� ����
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
x_test['description'] = df['description'].astype(str).str.replace("[^��-�� ��-�� ��-�R a-z A-Z]", " ")
print('x_test�� ���� : ', len(x_test))


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

print('df�� ���� : ', len(df), '������ ���� : ', len(pred))

 
        
 
# csv�� �ֱ�

def categoryName_to_categoryId(name : str):
    category_dict = {'IT/����': 1, '����':2 ,  '��ȭ/��Ȱ' : 3 , '�̿�/�ǰ�':4,   '��ȸ':5, '������':6, '����':7, '��ġ':8}
    id = category_dict[name]
    return id
    

df['category_id'] = pred
df['category_id'] = df['category_id'].apply(categoryName_to_categoryId)

df.to_csv(f'/home/ubuntu/data/article/{article_filedate}_{article_try}_article.csv', index=False, header=True)

   
        
        
        
        
        
        
        
        
        
from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.utils.dates import days_ago
from datetime import timedelta, datetime

default_args = {
    'owner': 'easssue',
    'depends_on_past': False,
    # 'email': ['isy5111@naver.com'],
    # 'email_on_failure': False,
    # 'email_on_retry': False,
    # 'retries': 1,
    # 'retry_delay': timedelta(minutes=5),
    # 'queue': 'bash_queue',
    # 'pool': 'backfill',
    # 'priority_weight': 10,
    # 'end_date': datetime(2023, 1, 1),
    # 'wait_for_downstream': False,
    # 'dag': dag,
    # 'sla': timedelta(hours=2),
    # 'execution_timeout': timedelta(seconds=300),
    # 'on_failure_callback': some_function,
    # 'on_success_callback': some_other_function,
    # 'on_retry_callback': another_function,
    # 'sla_miss_callback': yet_another_function,
    # 'trigger_rule': 'all_success'
}

import pandas as pd
meta_df = pd.read_csv('/home/ubuntu/data/meta.csv')

max_article_id, article_filedate, article_try, kwd_filedate, kwd_try = meta_df.loc[0,['max_article_id','article_filedate', 'article_try', 'kwd_filedate', 'kwd_try']]
article_try = str(article_try).zfill(2)
kwd_try = str(kwd_try).zfill(2)

dag = DAG(
    dag_id= 'get_article_to_db',
    default_args = default_args,
    description = 'get_article_to_db every hour',
    schedule_interval = "0 0-14,16-23 * * *",
    start_date = datetime(2022, 11, 16),
    dagrun_timeout=timedelta(minutes=60),
    catchup=False,
    tags = [f'{article_filedate}_{article_try}'],
)

get_article_csv = BashOperator(
    task_id='get_article_csv',
    bash_command='python3 /home/ubuntu/py/get_article_csv.py',
    dag=dag  # if it is not with dag process
)

category_sgd = BashOperator(
    task_id='category_sgd',
    bash_command='python3 /home/ubuntu/py/category_sgd_for_real.py',
    dag=dag
)

article_summary = BashOperator(
    task_id='article_summary',
    bash_command='python3 /home/ubuntu/py/article_summary.py',
    dag=dag
)

article = BashOperator(
    task_id='article',
    bash_command='python3 /home/ubuntu/py/db_article.py',
    dag=dag
)

article_kwd = BashOperator(
    task_id='article_kwd',
    bash_command='python3 /home/ubuntu/py/db_article_kwd.py',
    dag=dag
)

get_article_csv >> category_sgd >> article_summary >> article >> article_kwd
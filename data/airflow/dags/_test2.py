from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.utils.dates import days_ago
from datetime import timedelta

default_args = {
        'owner': 'easssue',
        'catchup': False,
        'execution_timeout': timedelta(hours=6),
        'depends_on_past': False,
    }

dag = DAG(
    'sample2',
    default_args = default_args,
    description = "sample description",
    schedule_interval = "@daily",
    start_date = days_ago(3),
    tags = ['daily'],
    max_active_runs=3,
    concurrency=1
)

sample_a = BashOperator(
    task_id='sample_a',
    bash_command='python3 /home/ubuntu/easssue/py/url_to_summary.py https://n.news.naver.com/mnews/article/003/0011524628?sid=103',
    dag=dag)

    
sample_a
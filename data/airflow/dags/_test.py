from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.python import BranchPythonOperator
from airflow.utils.dates import days_ago
from datetime import timedelta

def branch_funt():
    import datetime
    cur = datetime.datetime.now() + timedelta(hours=9)
    
    

default_args = {
        'owner': 'easssue',
        'catchup': False,
        'execution_timeout': timedelta(hours=6),
        'depends_on_past': False,
    }

dag = DAG(
    '_test3',
    default_args = default_args,
    description = "sample description",
    schedule_interval = "29 1-23 * * *",
    start_date = days_ago(3),
    tags = ['daily'],
    max_active_runs=3,
    concurrency=1
)

sample_a = BashOperator(
    task_id='sample_a',
    bash_command='echo hello',
    dag=dag)


#branch = BranchPythonOperator(
#    task_id='',
    

#   dag=dag)

sample_b = BashOperator(
    task_id='sample_b',
    bash_command='echo hello',
    dag=dag)
    
sample_a >> sample_b
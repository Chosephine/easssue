from datetime import datetime, timedelta
from textwrap import dedent

# The DAG object; we'll need this to instantiate a DAG
from airflow import DAG


# Operators; we need this to operate!
from airflow.operators.bash import BashOperator
# These args will get passed on to each operator
# You can override them on a per-task basis during operator initialization



today = datetime.now() + timedelta(hours=9)
today = today.strftime('%Y-%m-%d')

default_args = {
    'owner': 'owner-name',
    'depends_on_past': False,
    #'email': ['your-email@g.com'],
    #'email_on_failure': True,
    #'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=15),
    # 'queue': 'bash_queue',
    # 'pool': 'backfill',
    # 'priority_weight': 10,
    # 'end_date': datetime(2016, 1, 1),
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
with DAG(
    dag_id='rel_kwd_and_rec_kwd_to_db',
    default_args=default_args,
    description='keyword relation',
    schedule_interval='30 14 * * *', #  everyday 00:30 
    start_date=datetime(2022, 11, 17, 0,30,0),
    catchup=False,
    tags=[f'{today}'],
    dagrun_timeout=timedelta(minutes=120),

) as dag:

    rel_kwd_find_over10_under10 = BashOperator(
        task_id='rel_kwd_find_over10_under10',
        depends_on_past=False,
        bash_command='python3 /home/ubuntu/py/rel_kwd_find_over10_under10.py',
    )

    rel_kwd_over_10 = BashOperator(
        task_id='rel_kwd_over_10',
        depends_on_past=False,
        bash_command='python3 /home/ubuntu/py/rel_kwd_over_10.py',
        
    )
    
    rel_kwd_under_10 = BashOperator(
        task_id='rel_kwd_under_10',
        depends_on_past=False,
        bash_command='python3 /home/ubuntu/py/rel_kwd_under_10.py',
 
    )
    
    db_rel_kwd = BashOperator(
        task_id='db_rel_kwd',
        depends_on_past=False,
        bash_command='python3 /home/ubuntu/py/db_rel_kwd.py',
    )
    
    db_rec_kwd = BashOperator(
    task_id='db_rec_kwd',
    depends_on_past=False,
    bash_command='python3 /home/ubuntu/py/db_rec_kwd.py',
    )
    

    rel_kwd_find_over10_under10 >> rel_kwd_over_10 >> rel_kwd_under_10 >> db_rel_kwd >> db_rec_kwd
    
    
    
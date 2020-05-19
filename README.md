<p align="center">
  <img title="Redash" src='https://redash.io/assets/images/logo.png' width="200px"/>
</p>

[![Documentation](https://img.shields.io/badge/docs-redash.io/help-brightgreen.svg)](https://redash.io/help/)
[![Datree](https://s3.amazonaws.com/catalog.static.datree.io/datree-badge-20px.svg)](https://datree.io/?src=badge)
[![Build Status](https://circleci.com/gh/getredash/redash.png?style=shield&circle-token=8a695aa5ec2cbfa89b48c275aea298318016f040)](https://circleci.com/gh/getredash/redash/tree/master)

**_Redash_** is our take on freeing the data within our company in a way that will better fit our culture and usage patterns.

Prior to **_Redash_**, we tried to use traditional BI suites and discovered a set of bloated, technically challenged and slow tools/flows. What we were looking for was a more hacker'ish way to look at data, so we built one.

**_Redash_** was built to allow fast and easy access to billions of records, that we process and collect using Amazon Redshift ("petabyte scale data warehouse" that "speaks" PostgreSQL).
Today **_Redash_** has support for querying multiple databases, including: Redshift, Google BigQuery, PostgreSQL, MySQL, Graphite, Presto, Google Spreadsheets, Cloudera Impala, Hive and custom scripts.

**_Redash_** consists of two parts:

1. **Query Editor**: think of [JS Fiddle](https://jsfiddle.net) for SQL queries. It's your way to share data in the organization in an open way, by sharing both the dataset and the query that generated it. This way everyone can peer review not only the resulting dataset but also the process that generated it. Also it's possible to fork it and generate new datasets and reach new insights.
2. **Visualizations and Dashboards**: once you have a dataset, you can create different visualizations out of it, and then combine several visualizations into a single dashboard. Currently Redash supports charts, pivot table, cohorts and [more](https://redash.io/help/user-guide/visualizations/visualization-types).

<img src="https://raw.githubusercontent.com/getredash/website/8e820cd02c73a8ddf4f946a9d293c54fd3fb08b9/website/_assets/images/redash-anim.gif" width="80%"/>

## Getting Started

* [Setting up Redash instance](https://redash.io/help/open-source/setup) (includes links to ready made AWS/GCE images).
* [Documentation](https://redash.io/help/).

## Modify Point(jinlong)

## 需求

* dashboard根据分组进行展示及添加.
* queries根据分组进行展示及添加.
* dashboard分享链接, 不是所在组不能查看.


## dashboard与group进行关联

    dashboard表添加group_id:
    alter table dashboards add column group_id int references groups(id);

    queries表添加group_id:
    alter table queries add column group_id int references groups(id);

    users表对username添加唯一键:
    alter table users add constraint user_name unique(name);


## 分享链接权限问题

    1) 第一种方式, 通过分享按钮, 生成链接

        # 打开dashbaord, 点击分享按钮, 生成Secret address, 复制链接分享时,
        # 地址如下: http://red.rong360.com/public/dashboards/yq5tiNeo6xB03MBx9xKoU289ZneSe5Sovc5fVodX?org_slug=default
        # 这时的dashboard是通过key来访问, 所以后端获取dashboard得需要通过key的方式获取.
        # 同时前端在will mount时重定向到/dashboard/
        redash/handlers/dashboards.py
        client/app/pages/dashboards/PublicDashboardPage.jsx

    2) 第二种方式, 直接将dashboard地址发出去

        # 直接分享dashboard地址时, 若当前dashboard组不在该用户所在组, 则没有权限并显示带锁的界面
        # 后端判断当前dashboard是否在该用户的所在组
        # 前端根据后端返回来的err_infos来判断对应的锁信息
        redash/serializers/__init__.py
        client/app/components/dashboards/dashboard-widget/RestrictedWidget.jsx


## Bootstrap

    后端使用5000端口:
    python manage.py runserver --host=0.0.0.0 --port=5000 --debugger --reload

    前端启动(已配置8080端口):
    cnpm start


## Supported Data Sources

Redash supports more than 35 [data sources](https://redash.io/help/data-sources/supported-data-sources). 

## Getting Help

* Issues: https://github.com/getredash/redash/issues
* Discussion Forum: https://discuss.redash.io/

## Reporting Bugs and Contributing Code

* Want to report a bug or request a feature? Please open [an issue](https://github.com/getredash/redash/issues/new).
* Want to help us build **_Redash_**? Fork the project, edit in a [dev environment](https://redash.io/help-onpremise/dev/guide.html), and make a pull request. We need all the help we can get!

## Security

Please email security@redash.io to report any security vulnerabilities. We will acknowledge receipt of your vulnerability and strive to send you regular updates about our progress. If you're curious about the status of your disclosure please feel free to email us again. If you want to encrypt your disclosure email, you can use [this PGP key](https://keybase.io/arikfr/key.asc).

## License

BSD-2-Clause.

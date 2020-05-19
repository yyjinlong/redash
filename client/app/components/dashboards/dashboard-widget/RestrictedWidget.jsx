import React from "react";
import Widget from "./Widget";

function RestrictedWidget(props) {
  // NOTE(jinlong): 同一数据源不同组, 分享dashboard连接提示没权限!
  const msg = props.widget.err_infos ? (
    <p className="text-muted">{props.widget.err_infos}</p>
  ) : (
    <p className="text-muted">This widget requires access to a data source you don&apos;t have access to.</p>
  );

  return (
    <Widget {...props} className="d-flex justify-content-center align-items-center widget-restricted">
      <div className="t-body scrollbox">
        <div className="text-center">
          <h1>
            <span className="zmdi zmdi-lock" />
          </h1>
          {msg}
        </div>
      </div>
    </Widget>
  );
}

export default RestrictedWidget;

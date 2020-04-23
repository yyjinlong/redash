import { trim } from "lodash";
import React from "react";
import { axios } from "@/services/axios";
import Modal from "antd/lib/modal";
import Input from "antd/lib/input";
import Select from "antd/lib/select";
import notification from "antd/lib/notification"
import { wrap as wrapDialog, DialogPropType } from "@/components/DialogWrapper";
import navigateTo from "@/components/ApplicationArea/navigateTo";
import recordEvent from "@/services/recordEvent";

function CreateDashboardDialog({ dialog }) {
  const { Option } = Select;

  class DashModal extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: true,
        data: [],
        dashName: '',
        dashGroup: ''
      }
    }

    componentDidMount() {
      let groupList = []
      axios.get('api/groups').then((res) => {
        for (let item of res) {
          groupList.push(item.name)
        }
        this.setState({data: groupList})
      }, (res) => {
        console.log('获取组失败!')
      })
    }

    nameChange = (e) => {
      const value = e.target.value
      this.setState({dashName: value})
    }

    groupSelect = (value) => {
      this.setState({dashGroup: value})
    }

    handleOk = e => {
      if (!this.state.dashName || !this.state.dashGroup) {
        notification['error']({
          message: '数据验证',
          description: '名称和分组必须选择!',
          placement: 'topRight',
        });
        return
      }

      let postData = {
        'dashName': trim(this.state.dashName),
        'dashGroup': trim(this.state.dashGroup)
      }
      axios.post("api/dashboards", postData).then(data => {
        this.setState({
          visible: false,
        });
        navigateTo(`dashboard/${data.slug}?edit`)
      })
      recordEvent("create", "dashboard");
    };

    handleCancel = e => {
      this.setState({
        visible: false,
      });
    };

    render() {
      let groupList = this.state.data
      return (
        <div>
          <Modal
            title="New Dashboard"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Input placeholder="请输入dashboard名称" onChange={this.nameChange.bind(this)} autoFocus />
            <Select
              showSearch
              style={{ width: '100%', marginTop: 20 }}
              placeholder="请选择对应的分组"
              onSelect={this.groupSelect.bind(this)}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {
                groupList.map(function(name, index) {
                  return <Option key={index} value={name}>{name}</Option>
                })
              }
            </Select>
          </Modal>
        </div>
      );
    }
  }

  return (
    <DashModal />
  );
}

CreateDashboardDialog.propTypes = {
  dialog: DialogPropType.isRequired,
};

export default wrapDialog(CreateDashboardDialog);

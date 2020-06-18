import React from 'react';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { Table } from 'antd';
// 表格数据
function initData(data) {
  const newData = data.map((item) => {
    item.key = item.id;
    return item;
  });
  return newData;
}
let dragingIndex = -1;
class BodyRow extends React.Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
    const style = { ...restProps.style, cursor: 'move' };
    let { className } = restProps;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(<tr {...restProps} className={className} style={style} />),
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    console.log('propddddddddddd', props);
    console.log('monitormonitormonitormonitormonitor', monitor.getItem())
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    console.log('dragIndex', dragIndex);
    console.log('hoverIndex', hoverIndex)
    if (dragIndex === hoverIndex) {
      return;
    }
    props.moveRow(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
);


class DragSortingTable extends React.Component {
  state = {
    data: [],
    // Pagesize:10,
    // curPage:1
  }
  components = {
    body: {
      row: DragableBodyRow,
    },
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.questions !== nextProps.nextProps) {
      this.setState({
        data: initData(nextProps.questions),
      })
    }
  }
  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.state;
    const dragRow = data[dragIndex];
    this.setState(
      update(this.state, {
        data: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
        },
      }),
    );
  };

  render() {
    const { rowSelection, pagination, columns } = this.props;
    const { data = [] } = this.state;
    console.log('data', data)
    return (
      <DndProvider backend={HTML5Backend}>
        <Table
          dataSource={data}
          components={this.components}
          onRow={(record, index) => ({
            index,
            moveRow: this.moveRow,
          })}
          columns={columns}
          showHeader={false}
          rowSelection={rowSelection}
          pagination={pagination}
          loading={this.props.loading}
          // ref={(data) => { this.dataSource = data; }}
        />
      </DndProvider>
    );
  }
}
export default DragSortingTable;
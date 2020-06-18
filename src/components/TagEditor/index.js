import React from 'react';
import { Tag, Input } from 'antd';
import styles from './index.less';
class TagEditor extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tags:props.data,
            inputValue: '',
        };
    }
  
    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags });
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };
    handleInputConfirm = () => {
        const { inputValue } = this.state;
        const split = inputValue.split("；")
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, ...split];
        }
        this.setState({
            tags,
            inputValue: '',
        });
    };
    render() {
        const { tags, inputValue } = this.state;
        console.log('tags', tags)
        return (
            <div className={styles.tagsbox}>
                <h1>现有标签</h1>
                {tags.map((tag, index) => {
                    return (
                        <Tag
                            className="edit-tag"
                            key={tag}
                            closable
                            onClose={() => this.handleClose(tag)}
                        >
                            <span>
                                {tag}
                            </span>
                        </Tag>
                    )
                })}
                <h1>更多标签</h1>
                <Input
                    type="text"
                    size="default"
                    className="tag-input"
                    value={inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                    placeholder="请在此输入关键词，多个关键词用;隔开"
                    style={{ width: '70%' }}
                />
            </div>
        );
    }
}

export default TagEditor;
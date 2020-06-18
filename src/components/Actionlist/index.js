import React from 'react';
import { GetActionList } from './data.js';
import styles from './index.less';
let action = []
class Actionlist extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            all: styles.all,
            add: styles.add,
            management: styles.management,
            imports: styles.imports,
            deletes: styles.deletes,
        };
    }
    handelAll = () => {
        this.setState({
            all: styles['all-selected'],
            add: styles.add,
            management: styles.management,
            imports: styles.imports,
            deletes: styles.deletes
        })
        if (this.props.handelAll) {
            this.props.handelAll()
        }
    }
    handelAdd = () => {
        this.setState({
            add: styles['add-selected'],
            all: styles.all,
            management: styles.management,
            imports: styles.imports,
            deletes: styles.deletes
        })
        if (this.props.handelAdd) {
            this.props.handelAdd()
        }
    }
    handelTags = () => {
        this.setState({
            management: styles['management-selected'],
            all: styles.all,
            imports: styles.imports,
            deletes: styles.deletes,
            add: styles.add,
        })
        if (this.props.handelTags) {
            this.props.handelTags()
        }
    }
    handelImports = () => {
        this.setState({
            imports: styles['imports-selected'],
            all: styles.all,
            add: styles.add,
            management: styles.management,
            deletes: styles.deletes
        })
        if (this.props.handelImports) {
            this.props.handelImports()
        }
    }
    onDelete = () => {
        this.setState({
            deletes: styles['deletes-selected'],
            all: styles.all,
            add: styles.add,
            management: styles.management,
            imports: styles.imports

        })
        if (this.props.onDelete) {
            this.props.onDelete()
        }
    }
    handelOrder = () => {
        if (this.props.handelOrder) {
            this.props.handelOrder()
        }
    }
    render() {
        const { listName } = this.props;
        action = GetActionList(this.state, this, listName);
        return (
            <div className={styles.searchbox}>
                <ul>
                    {
                        action.map((item, index) => {
                            return (
                                <li key={index}>
                                    <span className={item.className} onClick={item.click}>{item.name}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Actionlist;
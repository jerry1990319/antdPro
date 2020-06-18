export function GetActionList(state, obj, listName) {
    let actionList = [];
    const { all, add, management, imports, deletes } = state;
    if (listName === "test") {
        actionList = [
            {
                click: obj.handelAll,
                name: '全部',
                className: all
            },
            {
                click: obj.handelAdd,
                name: '主题新增',
                className: add
            },
            {
                click: obj.handelTags,
                name: '标签管理',
                className: management
            },
            {
                click: obj.handelImports,
                name: '批量导入',
                className: imports
            },
            {
                click: obj.onDelete,
                name: '批量删除',
                className: deletes
            }

        ]
        return actionList;
    } else if (listName === "questionsGroup") {
         actionList = [
            {
                click: obj.handelAll,
                name: '全部',
                className: all
            },
            {
                click: obj.handelAdd,
                name: '新增',
                className: add
            },
            {
                click: obj.onDelete,
                name: '批量删除',
                className: deletes
            }

        ]
    } else if (listName === "questionsText") {
        actionList = [
            {
                click: obj.handelAll,
                name: '全部',
                className: all
            },
            {
                click: obj.handelAdd,
                name: '新增',
                className: add
            },
            {
                click: obj.handelImports,
                name: '批量导入',
                className: imports
            },
            {
                click: obj.onDelete,
                name: '批量删除',
                className: deletes
            },
            {
                click: obj.handelOrder,
                name: '排序保存',
                className: deletes
            },
            {
                click: obj.handelTags,
                name: '复制到',
                className: management
            }

        ]
    }else if(listName==='resultText'){
        actionList = [
            {
                click: obj.handelAll,
                name: '全部',
                className: all
            },
            {
                click: obj.handelAdd,
                name: '新增',
                className: add
            },
            {
                click: obj.handelImports,
                name: '批量导入',
                className: imports
            },
            {
                click: obj.onDelete,
                name: '批量删除',
                className: deletes
            }

        ]
    }

    return actionList;
}
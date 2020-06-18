export default {
  '/api/HumanInsightCenter/AdminSite/test/GetQuestions': (req, res) => {
    res.send({
      isSuccess: 'true',
      retMsg: '成功',
      data: [
        {
          title: '通用题库',
          // key: '0',
          style: { borderBottom: 'solid 0.5px #e3e3e3' },
          children: [
              { title: '测测你最适合的生活方式', key:'1',id: '1' },
              { title: '测一测你的桃花运什么时候来', id: '2',key: '2' },
              { title: '测测你最适合的生活方式测一测你的桃花运什么？', id: '3',key: '3' },
          ],
      },
      {
          title: '运势题库',
          // key: '1',
          style: { borderBottom: 'solid 0.5px #e3e3e3' },
          children: [
              { title: '测一测你的运气', id: '4' ,key: '4'},
              { title: '测试1', id: '5',key: '5' },
              { title: '测试2', id: '6',key: '6' },
          ],
      },
      {
          title: '爱情题库',
          // key: '2',
          style: { borderBottom: 'solid 0.5px #e3e3e3' },
          children: [
              { title: '测一测你何时脱单', id: '7' ,key: '7'},
              { title: '测一测你的另一半性格', id: '8' ,key: '8'},
              { title: '测一测你的恋爱等级', id: '9',key: '9' },
          ],
      },
      ]
    });
  },
  '/api/HumanInsightCenter/AdminSite/Test/DeleteTests': (req, res) => {
    console.log(11111, res)
    res.send({
     'isSuccess' : '0',
      'Message': '成功',
    });
  }
};
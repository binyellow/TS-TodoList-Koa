import todo from '../models/todo';
import { successResponse, failedResponse } from '../utils/response';
import { toSafeNumber } from '../utils/utils';

async function add(ctx, next) {
  const { userId, content, completed } = ctx.request.body;
  const res = await todo.create({ userId, content, completed });
  if(res.length!==0) {
    ctx.body = {
      failed: false,
      message: res
    }
  } else {
    ctx.body = {
      failed: true,
      message: '新增失败'
    }
  }
}

async function fetchList(ctx, next) {
  const { userId, current = 0, pageSize = 10 } = toSafeNumber(ctx.query, ['current', 'pageSize']);
  const total = todo.find({ userId });
  let res = await total.sort({time: -1}).skip((current)*pageSize).limit(pageSize);
  if(res instanceof Array && res.length>=0) {
    ctx.body = successResponse({
      current,
      pageSize,
      total: total.length,
      message: "查询成功",
      content: res,
    });
  } else {
    ctx.body = {
      failed: false,
      message: '无list',
      content: []
    }
  }
}

async function deleteItem(ctx, next) {
  const { _id } = ctx.request.body;
  const res = await todo.findOneAndDelete({ _id }).exec();
  if(res) {
    ctx.body = successResponse();
  } else {
    ctx.body = failedResponse();
  }
}

// async function updateTodo(toggleList) {
//   // do {
//   //   const { _id, completed } = toggleList[i];
//   //   const query = todo.findOne({ _id });
//   //   await query.updateOne({ $set: { completed: !completed } }, (err, values)=> {
//   //     if(i === toggleList.length - 1 ) {
//   //       return values
//   //     }
//   //   });
//   //   i++;
//   // }
//   // while( i <= toggleList.length-1 );
//   return toggleList.map(item=> {
//     const { _id, completed } = item;
//     console.log('_id===>', _id, 'completed===>', completed);
//     return todo.findOneAndUpdate({ _id }, { $set: { completed: !completed } }).exec();
//   })
// }

async function toggle(ctx, next) {
  const { toggleList = [] } = ctx.request.body;
  console.log('toggleList===>', toggleList);
  const res = await todo.bulkWrite(toggleList.map(item=>{
    const { _id, completed } = item;
    return {
      updateOne: {
        filter: { _id },
        update: { completed: !completed },
      }
    }
  }));
  if(res) {
    ctx.body = successResponse();
  } else {
    ctx.body = failedResponse();
  }
}
module.exports = { add, fetchList, deleteItem, toggle }
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
  const query = await todo.find({ userId });
  let res = await todo.find({ userId }).sort({time: -1}).skip((current)*pageSize).limit(pageSize);
  if(res instanceof Array && res.length>=0) {
    ctx.body = successResponse({
      current,
      pageSize,
      total: query.length,
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

/**
 * 循环更新效率很低，Todo updateMany
 * @param {*} ctx
 * @param {function} next
 */
async function toggleForeach(ctx, next) {
  const { toggleList = [] } = ctx.request.body;
  console.log('toggleList===>', toggleList);
  await new Promise((resolve, reject)=>{
    let res = undefined;
    toggleList.forEach(async (item, index)=> {
      const { _id, completed } = item;
      const result = todo.find({ _id });
      res = await result.update({ $set: { completed: !completed }}).exec();
      if(res) {
        if(index === toggleList.length - 1) {
          resolve(res);
        }
      } else {
        reject(res);
      }
    })
  }).then(res=> {
    ctx.body = successResponse();
  }, res=> {
    ctx.body = failedResponse();
  }).catch(err=> {
    ctx.body = failedResponse();
  })
}

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
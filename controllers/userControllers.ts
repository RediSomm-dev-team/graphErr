import database from '../models/database.ts';

const userController: any = {}

userController.pullAllUsers = async() => {
  await database.connect();
  const tables = await database.queryArray('SELECT * FROM "public"."User"');
  // iterate through each subarray in tables array and push each element of subarray to new object in array
  const resultArr: any = [];
  tables.rows.forEach((el) => {
    resultArr.push(
      { _id: el[0], username: el[1], password: el[2], status: el[3] }
    );
  });
  // console.log(resultArr);
  return resultArr;
}

// example controller middleware to mock internal validation errors
userController.pullUserById = async(userId: number) => {
  await database.connect();
  const sqlString = `SELECT * FROM "public"."User" WHERE _id = $1 and status = 'active';`
  const tables = await database.queryArray(
    sqlString,
    [userId]
  );
  const resultArr: any = [];
  tables.rows.forEach((el) => {
    resultArr.push(
      { _id: el[0], username: el[1], password: el[2], status: el[3] }
      );
    // console.log(resultArr);
  });
  // console.log(resultArr)
  return resultArr;
}

export default userController;
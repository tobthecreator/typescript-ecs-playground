export const TwoTo = (exponent: number): number => {
  return Math.pow(2, exponent);
};

// const checkStatus = (value: number, ...args: StatusEnum[]): boolean => {
//   return args.map((status) => status === (value & status)).every(Boolean);
// };

// // <br />
// const consoleLogLineBreak = () => console.log('\n');

// enum StatusEnum {
//   Unknown = 0, // 0000 -> 0
//   New = TwoTo(0), // 0001 -> 1
//   Dirty = TwoTo(1), // 0010 -> 2
//   Cleaned = TwoTo(2), // 0100 -> 4
//   InError = TwoTo(3), // 1000 -> 8
//   Processing = TwoTo(4), // 10000 -> 16
//   PersistedEntity = TwoTo(5) // 100000 -> 32
// }

// console.log('StatusEnum:', StatusEnum);

// consoleLogLineBreak();

// console.log('Value Assignment');
// // Init, 'New' StatusEnum only -> value = 1
// let value = StatusEnum.New;
// console.log('New StatusEnum Only:', value);

// // Add 'Processing' StatusEnum -> value = 17
// value |= StatusEnum.Processing;
// console.log('New and Processing:', value);

// // Add 'Dirty' StatusEnum -> value = 19
// value |= StatusEnum.Dirty;
// console.log('New, Processing and Dirty:', value);

// // Remove 'Dirty' StatusEnum -> value = 17
// value &= ~StatusEnum.Dirty;
// console.log('New, Processing (removed Dirty):', value);

// // Add 'Cleaned' StatusEnum -> value = 21
// value |= StatusEnum.Cleaned;
// console.log('New, Processing and Cleaned:', value);

// consoleLogLineBreak();

// console.log('Value Checks');
// console.log('Is it New?', checkStatus(value, StatusEnum.New));
// console.log('Is it Processing?', checkStatus(value, StatusEnum.Processing));
// console.log('Is it Dirty?', checkStatus(value, StatusEnum.Dirty));
// console.log('Is it Cleaned?', checkStatus(value, StatusEnum.Cleaned));
// console.log(
//   'Is it New, Processing and Cleaned?',
//   checkStatus(value, StatusEnum.Processing, StatusEnum.New, StatusEnum.Cleaned)
// );

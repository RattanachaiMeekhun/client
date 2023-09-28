export const summary= (item:number[])=>{
    return item.reduce(
        (acc, currentItem) => acc + currentItem,
        0
      );
}
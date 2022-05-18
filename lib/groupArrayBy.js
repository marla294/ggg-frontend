// This creates a 2 dimensional grouped array sorted by grouping
// Level 1: grouping value
// Level 2: all array items that have the matching grouping value

export default function groupArrayBy(arr = [], groupBy) {
  const grouping = arr.reduce((groupingObject, currentVal) => {
    // Get value of current object property to group on
    const currentGroup = currentVal[groupBy];
    // If the groupingArray already has a grouping for this, add current value to it, if not then create a new one
    groupingObject[currentGroup] = [
      ...(groupingObject[currentGroup] || []),
      currentVal,
    ];
    return groupingObject;
  }, {});

  return Object.entries(grouping).sort((a, b) => (a[0] < b[0] ? -1 : 1));
}

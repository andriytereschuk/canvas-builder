export const getFractions = (count) =>
  Array.from(new Array(count))
    .map(() => '1fr')
    .join(' ')

export const isIE = () => {
  const agent = navigator.userAgent

  return agent.includes('Trident') && agent.includes('rv:11')
}

export const groupRepeatedUnits = (templateUnitArray = [{ unit: '1fr' }]) => {
  const templateArray = templateUnitArray.map((i) => i.unit)
  const groups = [[templateArray.shift()]]
  for (const templateUnit of templateArray) {
    const lastGroup = groups[groups.length - 1]
    if (lastGroup.includes(templateUnit)) {
      lastGroup.push(templateUnit)
    } else {
      groups.push([templateUnit])
    }
  }
  return groups
}

export const createRepetition = (groups, maxRepetition = 1) => {
  return groups
    .map((group) =>
      // If you want to add repetition only when a measure is repeated more than x times,
      // change maxRepetition value to x
      group.length === maxRepetition
        ? group.join(' ')
        : `repeat(${group.length}, ${group[0]})`
    )
    .join(' ')
}

export const makeChildString = (child, endhover) => {
  // endhover is 'e' or 'h'
  const [startRow, endRow] =
    child.srow <= child[`${endhover}row`]
      ? [child.srow, child[`${endhover}row`]]
      : [child[`${endhover}row`], child.srow]
  const [startCol, endCol] =
    child.scol <= child[`${endhover}col`]
      ? [child.scol, child[`${endhover}col`]]
      : [child[`${endhover}col`], child.scol]
  const childstring = `${startRow} / ${startCol} / ${endRow + 1} / ${endCol +
    1}`
  // const lel = [startRow, startCol, endRow + 1, endCol + 1]
  return childstring
}

export const parseToObject = (element) => {
  const parsedArray = element.split('/').map((el) => +el)

  return {
    coords: {
      start: {
        x: parsedArray[0],
        y: parsedArray[1]
      },
      end: {
        x: parsedArray[2],
        y: parsedArray[3]
      }
    }
  }
}

export const isIntersect = (zone1, zone2) => {
  return (
    zone1.coords.start.x < zone2.coords.end.x &&
    zone1.coords.end.x > zone2.coords.start.x &&
    zone1.coords.start.y < zone2.coords.end.y &&
    zone1.coords.end.y > zone2.coords.start.y
  )
}

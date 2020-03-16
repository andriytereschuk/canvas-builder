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
  const fractionArr = [[templateArray.shift()]]
  for (const templateUnit of templateArray) {
    const lastFraction = fractionArr[fractionArr.length - 1]
    if (lastFraction.includes(templateUnit)) {
      lastFraction.push(templateUnit)
    } else {
      fractionArr.push([templateUnit])
    }
  }

  return fractionArr
}

export const createRepetition = (fractions, maxRepetition = 1) => {
  return fractions
    .map((fraction) =>
      // If you want to add repetition only when a measure is repeated more than x times,
      // change maxRepetition value to x
      fraction.length === maxRepetition
        ? fraction.join(' ')
        : `repeat(${fraction.length}, ${fraction[0]})`
    )
    .join(' ')
}

export const createZone = (child, endhover) => {
  const [startRow, endRow] =
    child.startRow <= child[`${endhover}Row`]
      ? [child.startRow, child[`${endhover}Row`]]
      : [child[`${endhover}Row`], child.startRow]
  const [startCol, endCol] =
    child.startCol <= child[`${endhover}Col`]
      ? [child.startCol, child[`${endhover}Col`]]
      : [child[`${endhover}Col`], child.startCol]
  const zone = `${startRow} / ${startCol} / ${endRow + 1} / ${endCol + 1}`

  return zone
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

export const createInitialArr = (direction, arr) => {
  for (let i = 1; i <= direction; i++) {
    arr.push({ unit: '1fr' })
  }
}

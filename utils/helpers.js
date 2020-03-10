export const getFractions = (count) =>
  Array.from(new Array(count))
    .map(() => '1fr')
    .join(' ')

export const isIE = () => {
  const agent = navigator.userAgent

  return agent.includes('Trident') && agent.includes('rv:11')
}

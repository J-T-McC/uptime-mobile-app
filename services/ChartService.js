import ResourceService from '~/services/ResourceService'

const trendResource = ResourceService('event-counts-trended')

const getTrended = async (resourceID = null) => {
  const method = resourceID ? 'show' : 'index'
  const { data } = await trendResource[method](resourceID)
  const formattedData = []
  data.reverse()
  data.forEach((series, index) => {
    formattedData.push({
      x: index,
      y: parseFloat(series.percent),
      meta: {
        label: series.category,
        date: series.filter_date
      }
    })
  })
  return formattedData
}

const pieResource = ResourceService('event-counts-grouped')

const backgroundColors = {
  Down: '#E5E7EB',
  Up: '#60A5FA',
}

const getPast90Days = async (resourceID = null) => {
  const method = resourceID ? 'show' : 'index'
  const { data } = await pieResource[method](resourceID)
  const formattedData = []
  data.forEach((series, index) => {
    formattedData.push({
      name: series.category,
      y: parseFloat(series.percent),
      color: backgroundColors[series.category],
      legendFontColor: "#7F7F7F",
      legendFontSize: 13
    })
  })

  return formattedData
}

export { getTrended, getPast90Days }
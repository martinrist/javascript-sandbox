window.DOM = ( ->

  changeElements = (selectorF, name, mutatorF) ->
    elts = selectorF.call document, name
    if elts.length == undefined
      mutatorF(elts)
    else
      mutatorF(elt) for elt in elts

  changeElementColour = (colour) ->
    (elt) ->
      elt.style.color = colour

  changeElementColourByTagName = (name, colour) ->
    changeElements(document.getElementsByTagName, name, changeElementColour(colour))

  changeElementColourByClassName = (name, colour) ->
    changeElements(document.getElementsByClassName, name, changeElementColour(colour))

  changeElementColourById = (id, colour) ->
    changeElements(document.getElementById, id, changeElementColour(colour))

  changeElementColourByCSSSelector = (selector, colour) ->
    changeElements(document.querySelectorAll, selector, changeElementColour(colour))

  changeElementColourById: changeElementColourById
  changeElementColourByTagName: changeElementColourByTagName
  changeElementColourByClassName: changeElementColourByClassName
  changeElementColourByCSSSelector : changeElementColourByCSSSelector
)()
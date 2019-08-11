const FLibra = artifacts.require('./FLibra');

//import chai and chai as promised
require('chai')
  .use(require('chai-as-promised'))
  .should() 
 
contract('FLibra', ([deployer, user1, user2, user3, user4]) => {

  //fetch flibra contract before each async function
  beforeEach(async () => {
    flibra = await FLibra.new()
  })

  describe('posting item', () => {
    let result
    let itemName = "Item 1"
    let itemPrice = 10
    let itemName2 = "Item 2"
    let itemPrice2 = 15

    beforeEach(async() => {
      result = await flibra.setItem(itemName, itemPrice, {from: user1})
      await flibra.setItem(itemName2, itemPrice2, {from: user2})
    })

    it('emits a post item event', async () => {
      const log = result.logs[0]
      log.event.should.eq(('PostItem'))
      const event = log.args
      event.itemName.should.equal(itemName, 'item name is correct')
      event.price.toString().should.equal(itemPrice.toString(), 'item price is correct')
    })

    it('get posted item', async () => {
      result = await flibra.getItem({ from: user1 })
      result.itemName.should.equal(itemName, 'item name is correct')
      result.price.toString().should.equal(itemPrice.toString(), 'item price is correct')
      result.selling.toString().should.equal("true", 'selling is true' )
    })

    it('get all posted item', async () => {
      // tset for first item
      result = await flibra.getAllItem(0, { from: user1 })
      result.itemName.should.equal(itemName, 'item name is correct')
      result.price.toString().should.equal(itemPrice.toString(), 'item price is correct')
      result.selling.toString().should.equal("true", 'selling is true' )

      //test for secound item
      result = await flibra.getAllItem(1, { from: user1 })
      result.itemName.should.equal(itemName2, 'item name is correct')
      result.price.toString().should.equal(itemPrice2.toString(), 'item price is correct')
      result.selling.toString().should.equal("true", 'selling is true' )
    })

    it('get number of item', async () => {
      // tset for first item
      result = await flibra.getNumberOfItem()
      result.toString().should.equal("2")
    })

  })



})
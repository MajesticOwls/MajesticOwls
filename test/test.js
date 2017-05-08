
// this is the default test from the website/
//delete when we build our own
var assert = require('assert');
var request = require('request');
var expect = require('chai').expect;
var express = require('express');
var historyStorage = require('../database/index');
var mongoose = require('mongoose');







/***********************************************************
This test is to test the testing suite
************************************************************/
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});


/************************************************************
DATABASE
*************************************************************/
xdescribe('Database', function() {

    it('Should return true when a new user is created with a search', function() {

    });

    xit('Should return true when a collection in the database id dropped', function() {


    })



})

/************************************************************
Server
*************************************************************/

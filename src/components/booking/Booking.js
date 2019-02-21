import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {BookingModal} from './BookingModal';
import {getRangeOfDates} from 'helpers';
import * as moment from 'moment';

export class Booking extends React.Component {

  constructor(){
    super();
    this.BookedOutDates = []
    this.dateRef = React.createRef();
    this.state = {
      proposedBooking: {
        startAt: '',
        endAt: '',
        guests: 0,
        rental: {}
      },
      modal: {
        open: false
      }
      
    }
    this.checkInvalidDates = this.checkInvalidDates.bind(this)
    this.handleApply = this.handleApply.bind(this)
    this.cancelConfirmation = this.cancelConfirmation.bind(this)
  }

  componentWillMount(){
    this.getBookedOutDates();
  }

  getBookedOutDates(){
    const {bookings} = this.props.rental;

    if(bookings && bookings.length > 0){
      bookings.forEach(booking => {
        const dateRange = getRangeOfDates(booking.startAt, booking.endAt, 'Y/MM/DD')
        this.BookedOutDates.push(...dateRange)
      })
    }
  }

  checkInvalidDates(date){
    return this.BookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0;
  }

  handleApply(event, picker){
    const startAt = picker.startDate.format('Y/MM/DD')
    const endAt = picker.endDate.format('Y/MM/DD')

    this.dateRef.current.value = startAt + ' to ' + endAt;
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt,
        endAt
      }
     
    })

    console.log()
  }

  selectGuests(event){
    this.setState({
      proposedBooking:{
        ...this.state.proposedBooking,
        guests: parseInt(event.target.value)

      }
    })
  }

  cancelConfirmation(){
    this.setState({
      modal: {
        open: false
      }
    })
  }
  confirmProposedData(){
    const {startAt, endAt} = this.state.proposedBooking;
    const days = getRangeOfDates(startAt, endAt).length -1;
    const {rental} = this.props;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        days,
        totalPrice: days * rental.dailyRate,
        rental
      },
      modal: {
        open: true
      }
    })
    console.log(this.state)
  }

  render() {
    const {rental} = this.props;
    const {startAt, endAt, guests} = this.state.proposedBooking
    return (
      <div className='booking'>
        <h3 className='booking-price'>$ {rental.dailyRate} <span className='booking-per-night'>per night</span></h3>
        <hr></hr>
        <div className='form-group'>
        <label htmlFor='dates'>Dates</label>
          <DateRangePicker onApply={this.handleApply} 
                           isInvalidDate={this.checkInvalidDates}
                           opens='left' 
                           containerStyles={{display: 'block'}}>
            <input ref={this.dateRef} id='dates' type='text' className='form-control'></input>
          </DateRangePicker>
        </div>
        <div className='form-group'>
          <label htmlFor='guests'>Guests</label>
          <input onChange={(event) => {this.selectGuests(event)}}
             type='number' 
             className='form-control' 
             id='guests' 
             aria-describedby='emailHelp' 
             placeholder=''>
          </input>
        </div>
        <button disabled={!startAt || !endAt || !guests} onClick={() => this.confirmProposedData()} className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
        <hr></hr>
        <p className='booking-note-title'>People are interested into this house</p>
        <p className='booking-note-text'>
          More than 500 people checked this rental in last month.
        </p>
        <BookingModal open={this.state.modal.open} 
                      closeModal={this.cancelConfirmation}
                      booking={this.state.proposedBooking}/>
      </div>
    )
  }
}

package entities;

public class HotelOrders {

	private Tuple[] googleTuples;
	private Tuple[] bookingTuples;
	private Tuple[] expediaTuples;
	private int[] taxonomy;

	public int[] getTaxonomy() {
		return taxonomy;
	}

	public void setTaxonomy(int[] taxonomy) {
		this.taxonomy = taxonomy;
	}

	public Tuple[] getGoogleTuples() {
		return googleTuples;
	}

	public void setGoogleTuples(Tuple[] googleTuples) {
		this.googleTuples = googleTuples;
	}

	public Tuple[] getBookingTuples() {
		return bookingTuples;
	}

	public void setBookingTuples(Tuple[] bookingTuples) {
		this.bookingTuples = bookingTuples;
	}

	public Tuple[] getExpediaTuples() {
		return expediaTuples;
	}

	public void setExpediaTuples(Tuple[] expediaTuples) {
		this.expediaTuples = expediaTuples;
	}
	 	 
}
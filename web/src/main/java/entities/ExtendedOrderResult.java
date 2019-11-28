package entities;

import java.util.List;

public class ExtendedOrderResult {

	private List<Integer> order;

	public ExtendedOrderResult(List<Integer> order) {
		super();
		this.order = order;
	}

	public List<Integer> getTotalOrder() {
		return order;
	}

	public void setTotalOrder(List<Integer> order) {
		this.order = order;
	}
}
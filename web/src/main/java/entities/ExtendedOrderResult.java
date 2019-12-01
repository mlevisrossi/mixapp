package entities;

import java.util.List;

public class ExtendedOrderResult {

	private List<TotalOrderElem> order;

	public ExtendedOrderResult(List<TotalOrderElem> order) {
		super();
		this.order = order;
	}

	public List<TotalOrderElem> getTotalOrder() {
		return order;
	}

	public void setTotalOrder(List<TotalOrderElem> order) {
		this.order = order;
	}
}
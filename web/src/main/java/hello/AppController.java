package hello;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import entities.ExtendedOrderResult;
import entities.HotelOrders;
import entities.TotalOrderElem;
import services.MainService;

@RestController
public class AppController {
	
	private MainService service = new MainService();

	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@RequestMapping(
		value = "/multicontext", 
		method = RequestMethod.POST,
		consumes = "application/json"
	)
    public ExtendedOrderResult extendedOrder(@RequestBody HotelOrders data) {
		
		List<TotalOrderElem> totalOrder = service.getExtendedOrder(data);
		return new ExtendedOrderResult(totalOrder);
    }
	
}
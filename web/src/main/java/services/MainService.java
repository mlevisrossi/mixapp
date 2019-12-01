package services;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.Iterator;

import org.jgrapht.graph.DefaultDirectedGraph;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.traverse.TopologicalOrderIterator;
import org.springframework.stereotype.Service;

import Algorithms.Algorithms;
import Entities.CredibilityElement;
import Entities.TaxonomyElement;
import Entities.Context;
import Entities.Agent;


import Factorys.AgentFactory;
import Factorys.ContextFactory;
import Factorys.CredibilityElementFactory;
import Select.LCSF;
import Sets.Credibility_base;
import Sets.Credibility_order;
import Sets.Taxonomy;
import entities.HotelOrders;
import entities.TotalOrderElem;
import entities.Tuple;


@Service
public class MainService {
	
	public List<TotalOrderElem> getExtendedOrder(HotelOrders HO) {
		
		// CredibilityElement(Agent_1, Agent_2) --> ( Agent_1 < Agent_2 )
		// TaxonomyElement(Context_1, Context_2) --> Context_1 is the father of Context_2 in the taxonomy.
		Credibility_base base;
		Taxonomy taxonomy;
		
		//HO.taxonomy = [t1, t2, t3]
		//1=google, 2=booking, 3=expedia
		int t1 = HO.getTaxonomy()[0];
		int t2 = HO.getTaxonomy()[1];
		int t3 = HO.getTaxonomy()[2];
		
		//Create taxonomy t1<t2<t3
		Context first, second, third;
		taxonomy = new Taxonomy();
		
		first = ContextFactory.getContext(t1);
		second = ContextFactory.getContext(t2);
		third = ContextFactory.getContext(t3);

		taxonomy.addTaxonomyElement(new TaxonomyElement(first, second)); // t1<t2 added
		taxonomy.addTaxonomyElement(new TaxonomyElement(second, third)); // t2<t3 added		
		
		//Create credibility base
		base = new Credibility_base();
		Context context;
		Agent ag1, ag2;
		CredibilityElement element;
		
		// Creating credibility order of Context 1 (Google).
		Tuple[] googleTuples = HO.getGoogleTuples();
		for(Tuple t : googleTuples) { 
			context = ContextFactory.getContext(1); // Si lista es Booking, será 1; de lo contrario, será el número de contexto que representa al sitio web.
			ag1 = AgentFactory.getAgent(t.getH1()); 
			ag2 = AgentFactory.getAgent(t.getH2());
			element = CredibilityElementFactory.getTuple(ag1, ag2);
			base.addCredibilityElement (context, element); // Agrega la relación ag1 < ag2 en el contexto Context
		}
		
		// Creating credibility order of Context 2 (Booking).
		Tuple[] bookingTuples = HO.getBookingTuples();
		for(Tuple t : bookingTuples) { 
			context = ContextFactory.getContext(2); // Si lista es Booking, será 1; de lo contrario, será el número de contexto que representa al sitio web.
			ag1 = AgentFactory.getAgent(t.getH1()); 
			ag2 = AgentFactory.getAgent(t.getH2());
			element = CredibilityElementFactory.getTuple(ag1, ag2);
			base.addCredibilityElement (context, element);
		}
		
		// Creating credibility order of Context 3 (Expedia).
		Tuple[] trivagoTuples = HO.getTrivagoTuples();
		for(Tuple t : trivagoTuples) { 
			context = ContextFactory.getContext(3); // Si lista es Booking, será 1; de lo contrario, será el número de contexto que representa al sitio web.
			ag1 = AgentFactory.getAgent(t.getH1()); 
			ag2 = AgentFactory.getAgent(t.getH2());
			element = CredibilityElementFactory.getTuple(ag1, ag2);
			base.addCredibilityElement (context, element);
		}
		
		// Extended order of context t1, making use Least Credibility Selection Function.
		Credibility_order extendedOrder = Algorithms.getExtendedOrderCompilation(base, taxonomy, ContextFactory.getContext(t3), new LCSF());
		
		int a1, a2; 
		Tuple newTuple;
		List<Tuple> partialOrder = new ArrayList<>();
		for(CredibilityElement e :  extendedOrder.tuples()) {
			a1 = e.getAgent1().getId();
			a2 = e.getAgent2().getId();  
			newTuple = new Tuple(a1, a2);
			partialOrder.add(newTuple);
		}	
		
		List<TotalOrderElem> totalOrder = constructTotalOrder(partialOrder);
		return totalOrder;
		
	}
	
	public List<TotalOrderElem> constructTotalOrder(List<Tuple> partialOrder){
		List<Integer> totalOrder = new ArrayList<>();
		
		//Directed graph that represents the partial order
		DefaultDirectedGraph<Integer, DefaultEdge> directedGraph  = new DefaultDirectedGraph<>(DefaultEdge.class);
		
		//Add vertices and edges to the graph
		int h1, h2;
		for(Tuple t: partialOrder) {
			h1 = t.getH1();
			h2 = t.getH2();
			directedGraph.addVertex(h1);
			directedGraph.addVertex(h2);
			directedGraph.addEdge(h2, h1);
		}
		
		//get a total order from the partial order, using the topological order sort
		int i;
		Iterator<Integer> iterator = new TopologicalOrderIterator<Integer, DefaultEdge>(directedGraph);
		while (iterator.hasNext()) {
            i = iterator.next();
            totalOrder.add(i);
        }
		
		//From the total order and the graph, get the pos of each element in the partial order
		List<TotalOrderElem> totalOrderWithPos = new ArrayList<>();
		int pos;
		for(int elem: totalOrder) {
			pos = getPos(directedGraph, elem);
			totalOrderWithPos.add(new TotalOrderElem(elem, pos));
		}
		
		return totalOrderWithPos;
	}
	
	private int getLevel(DefaultDirectedGraph<Integer, DefaultEdge> directedGraph, int elem) {
		int level = 1, parent;
		int i = elem;
		DefaultEdge edge;
		Set<DefaultEdge> incomingEdges;
		Iterator<DefaultEdge> iteratorIncoming;
		
		//Transverse the graph from the element to the source vertice
		while (!directedGraph.incomingEdgesOf(i).isEmpty()){	//while i has a parent
			incomingEdges = directedGraph.incomingEdgesOf(i);
			iteratorIncoming = incomingEdges.iterator();
			edge = iteratorIncoming.next();		//every elem has only one parent
			parent = directedGraph.getEdgeSource(edge);
			level += 1;
			i = parent;
        }
		return level;
	}
	
	private int getPos(DefaultDirectedGraph<Integer, DefaultEdge> directedGraph, int elem) {
		DefaultEdge edgeToElem;
		Set<DefaultEdge> incomingEdges;
		Iterator<DefaultEdge> iteratorIncoming;
		int parent, parentPos;
		int pos= 0;
		
		//if elem has no parent, pos is 1
		if(directedGraph.incomingEdgesOf(elem).isEmpty()) {
			return 1;
		} else {	//elem has one parent or more
			incomingEdges = directedGraph.incomingEdgesOf(elem);
			iteratorIncoming = incomingEdges.iterator();
			while (iteratorIncoming.hasNext()) {
	            edgeToElem = iteratorIncoming.next();
	            parent = directedGraph.getEdgeSource(edgeToElem);
	            parentPos = getPos(directedGraph, parent);
	            if(parentPos > pos) {
	            	pos = parentPos;
	            }
	        }
			
			return pos + 1;
		}
		
	}
	
}
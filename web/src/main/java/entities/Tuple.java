package entities;

public class Tuple {

	 private int h1;
	 private int h2;

	 public Tuple(int h1, int h2) {
		 this.h1 = h1;
		 this.h2 = h2;
	 }
	 
	 public void setH1(int h1) {
		 this.h1 = h1;
	 }
	 public void setH2(int h2) {
		 this.h2 = h2;
	 }
	 
	 public int getH1() {
		 return h1;
	 }
	 public int getH2() {
		 return h2;
	 }
}
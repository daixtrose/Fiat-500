function domainRotational(){
  return DOMAIN([[0,1],[0,2*PI]])([36,36]); 
}

function rotationalSurface(funCurve){
  var sup = MAP(ROTATIONAL_SURFACE(funCurve))(domainRotational())
  return sup;
}


function cylinder(r,h,dom) {
    var cyl = EXTRUDE([h])(DISK([r])(dom))
    return cyl;
  };

function curveHermite(controlPoints){
    var domainCurve=INTERVALS(1)(12);
    var curva = CUBIC_HERMITE(S0)(controlPoints)
    return MAP(curva)(domainCurve)
  }

function supHermite(controlPoints1,controlPoints2,t1,t2){
    var domainSurface=DOMAIN([[0,1],[0,1]])([12,12]); 
    var curva1 = CUBIC_HERMITE(S0)(controlPoints1)
    var curva2 = CUBIC_HERMITE(S0)(controlPoints2)
    var funCur = CUBIC_HERMITE(S1)([curva1,curva2,t1,t2])
    return MAP(funCur)(domainSurface)
  }

function creaToro(R,r){
	var domain = DOMAIN([[0,2*PI],[0,2*PI]])([36,72])
	function torus(R,r){
 		return function(v){
    		var a = v[0];
    		var b = v[1];
    		var u = (r * COS(a) + R) * COS(b);
    		var v = (r * COS(a) + R) * SIN(b);
    		var w = (r * SIN(a));
    		return [u,v,w];
  	}
  }
  var mapping = torus(R,r);
  return MAP(mapping)(domain);
}

function annulus_sector (alpha, r, R) {
  var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    
    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  return model;
}

function rgb(r,g,b){
  return COLOR([r/255, g/255, b/255]);
}



////////////////////////////////////////////////////////////////////////

function steeringWheel(){
		internalDisk=T([2])([1.5])(cylinder(1.1,2.5,12))
		overInternalDisk=DISK([0.9])(12)
		externalTorus=creaToro(5,0.5)
		logoDisk=annulus_sector(2*PI, 0.9, 1)

		p1=[[5,1,-0.3],[0.5,0.5,1.8],[0,-2,0],[-1,1,0]]
		p2=[[5,1,0.3],[0.8,0.5,2.4],[0,-2,0],[-1,1,0]]
		p3=[[5,-1,-0.3],[0.5,-0.5,1.8],[0,2,0],[-1,-1,0]]
		p4=[[5,-1,0.3],[0.8,-0.5,2.4],[0,2,0],[-1,-1,0]]

		p5=[[-5,1,-0.3],[-0.5,0.5,1.8],[0,-2,0],[1,1,0]]
		p6=[[-5,1,0.3],[-0.8,0.5,2.4],[0,-2,0],[1,1,0]]
		p7=[[-5,-1,-0.3],[-0.5,-0.5,1.8],[0,2,0],[1,-1,0]]
		p8=[[-5,-1,0.3],[-0.8,-0.5,2.4],[0,2,0],[1,-1,0]]

		sup1=supHermite(p1,p2,[0,0,0],[0,0,0])
		sup2=supHermite(p3,p4,[0,0,0],[0,0,0])
		sup3=supHermite(p1,p3,[0,0,0],[0,0,0])
		sup4=supHermite(p2,p4,[0,0,0],[0,0,0])

		sup5=supHermite(p5,p6,[0,0,0],[0,0,0])
		sup6=supHermite(p7,p8,[0,0,0],[0,0,0])
		sup7=supHermite(p5,p7,[0,0,0],[0,0,0])
		sup8=supHermite(p6,p8,[0,0,0],[0,0,0])

		model=rgb(210,180,140)(STRUCT([externalTorus,internalDisk,sup1,sup2,sup3,sup4,sup5,sup6,sup7,sup8]))
		logo=T([2])([1.49])(STRUCT([rgb(0,0,0)(overInternalDisk),rgb(192,192,192)(logoDisk)]))
	return R([0,1])([PI/10])(R([0,2])([-PI/2])(STRUCT([model,logo])))
}

DRAW(steeringWheel())



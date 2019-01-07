var sphereNorm = ( function() {

	function createVertexData() {
		var n = 32;
		var m = 32;

		// Positions.
		this.vertices = new Float32Array(3 * (n + 1) * (m + 1));
		var vertices = this.vertices;
		// Normals.
		this.normals = new Float32Array(3 * (n + 1) * (m + 1));
		var normals = this.normals;
		// Index data.
		this.indicesLines = new Uint16Array(2 * 2 * n * m);
		var indicesLines = this.indicesLines;
		this.indicesTris = new Uint16Array(3 * 2 * n * m);
		var indicesTris = this.indicesTris;

		var du = 2 * Math.PI / n;
		var dv = Math.PI / m;
		var r = 1;
		// Counter for entries in index array.
		var iLines = 0;
		var iTris = 0;

		// Loop angle u.
		for(var i = 0, u = 0; i <= n; i++, u += du) {
			// Loop angle v.
			for(var j = 0, v = 0; j <= m; j++, v += dv) {

				var iVertex = i * (m + 1) + j;

				var x = r * Math.sin(v) * Math.cos(u);
				var y = r * Math.sin(v) * Math.sin(u);
				var z = r * Math.cos(v);

				// Set vertex positions.
				vertices[iVertex * 3] = x;
				vertices[iVertex * 3 + 1] = y;
				vertices[iVertex * 3 + 2] = z;

				// Calc and set normals.
				var vertexLength = Math.sqrt(x * x + y * y + z * z);

				var toonNormalX = x / vertexLength;
                var toonNormalY = y / vertexLength;
                var toonNormalZ = z / vertexLength;
                var averageToonNormal = (toonNormalX + toonNormalY + toonNormalZ )/3;

                if(averageToonNormal > -1 && averageToonNormal <=-0.7){
                    normals[iVertex * 3] = -0.9;
                    normals[iVertex * 3 + 1] = -0.9;
                    normals[iVertex * 3 + 2] = -0.9;
                }
                else if(averageToonNormal > -0.7 && averageToonNormal<=-0.4){
                    normals[iVertex * 3] = -0.6;
                    normals[iVertex * 3 + 1] = -0.6;
                    normals[iVertex * 3 + 2] = -0.6;
                }
                 else if(averageToonNormal >-0.4 && averageToonNormal <=-0.2){
                    normals[iVertex * 3] = -0.2;
                    normals[iVertex * 3 + 1] = -0.2;
                    normals[iVertex * 3 + 2] = -0.2;
                 }
                 else if(averageToonNormal > -0.2 && averageToonNormal<= 0.1){
                     normals[iVertex * 3] =0.1;
                     normals[iVertex * 3 + 1] = 0.1;
                     normals[iVertex * 3 + 2] = 0.1;
                 }
                  else if(averageToonNormal> 0.1 &&averageToonNormal <=0.4){
                      normals[iVertex * 3] = 0.4;
                      normals[iVertex * 3 + 1] = 0.4;
                      normals[iVertex * 3 + 2] = 0.4;
                  }
                  else if(averageToonNormal > 0.4 && averageToonNormal<=0.7){
                      normals[iVertex * 3] = 0.6;
                      normals[iVertex * 3 + 1] = 0.6;
                      normals[iVertex * 3 + 2] = 0.6;
                   }
                   else if(averageToonNormal > 0.7 && averageToonNormal <= 1.0){
                       normals[iVertex * 3] =0.9;
                       normals[iVertex * 3 + 1] = 0.9;
                       normals[iVertex * 3 + 2] = 0.9;
                   }
                   else {
                        normals[iVertex * 3] =toonNormalX;
                        normals[iVertex * 3 + 1] = toonNormalY;
                       normals[iVertex * 3 + 2] = toonNormalZ;
                   }

				// Set index.
				// Line on beam.
				if(j > 0 && i > 0) {
					indicesLines[iLines++] = iVertex - 1;
					indicesLines[iLines++] = iVertex;
				}
				// Line on ring.
				if(j > 0 && i > 0) {
					indicesLines[iLines++] = iVertex - (m + 1);
					indicesLines[iLines++] = iVertex;
				}

				// Set index.
				// Two Triangles.
				if(j > 0 && i > 0) {
					indicesTris[iTris++] = iVertex;
					indicesTris[iTris++] = iVertex - 1;
					indicesTris[iTris++] = iVertex - (m + 1);
					//
					indicesTris[iTris++] = iVertex - 1;
					indicesTris[iTris++] = iVertex - (m + 1) - 1;
					indicesTris[iTris++] = iVertex - (m + 1);
				}
			}
		}
	}

	return {
		createVertexData : createVertexData
	}

}());

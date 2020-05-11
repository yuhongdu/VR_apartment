# VR-APT
A website enabling 3d panorma interactive experience to present apartments/design ideas. Furniture information and color change feature enabled in scene 3

#### Main Skills
* ReactVR usage: similar to react native.
* Bridging from React VR to normal react without using i-frame(which, disable communication between two parts)
  * First trial: using react-router. failed on taking querry strings
  * Second trial: using express router, and make api call to get the current scene start props before loading VR, ending up sending to htmls(one for react, one for reactVR):
    ```
    let place
    //get current scene
    $.get("/scene", function(data){
        console.log(data)
        place = `Project_${data[0].number}.json`
        console.log(place)
        // Initialize the React VR application
        ReactVR.init(
          // Attach it to the body tag
          document.body,
          {
              initialProps:{
                  file: place
              }
          }
        );
    })
    ```
   * Third tiral: trying to incoperate the html for react vr into the one used for normal react (to be experimented)
 * Watch out for .gitignore file before deployment, the default setting is not to push stuff in build folder
 * When using cylinder panel, convert real meter to pixel ----- index.vr.js

<template>
  <div>
  <v-card
    flat
  >
    <v-card-title>
      <h2 :class="`display-1 font-weight-light mb-4 pink--text`">Welcome to your new website!</h2>
    </v-card-title>
    <v-card-text>
      <v-icon>mdi-human-greeting</v-icon>
      I am so happy to see you.<br>
      <h2 :class="`headline font-weight-light mb-4`">Hopefully, this can replace our old boring website! 
      Just remember that there is still a lot of work to be done here. Only the visual part of the website is being completed right now.
      I wanted to get some light feedback from you guys and see what I need to focus on from here.<br><br>
      I still need to work on many features to ensure that this website provides every features that old colossus does. 
      But I want this to do much more than colossus, I am thinking of integrating other third party APIs like JIRA and Tantalus so everything you do can be done within this website.<br><br>
      <v-icon>mdi-bug</v-icon><v-icon>mdi-bug</v-icon>Just be careful, since there are alot of bugs.<v-icon>mdi-bug</v-icon><v-icon>mdi-bug</v-icon><br><br>
      
      Or if you don't like this and wanna stick to our old website I will be hugely disappointed but that's fine too.<br><br>
      If you have any problem, suggestion or feedback please contact Simong Song on our slack.</h2>
    
     <div class="my-2">
        <v-btn text>
        <v-icon>mdi-run-fast</v-icon>
        This upsets me take me back to old website.</v-btn>
      </div>
    
    </v-card-text>
    
  </v-card>
  </div>
</template>

<script>

export default {
  components: {
  },
};
</script>

const qnaApp = angular.module('qnaApp', []);
qnaApp.controller('qnaCntrl', function($scope) {
    $scope.qnaArray = [
        { question: "Q: What got you into programming?",
         answer: 'A: Trying to make a discord bot. It was during the lockdown of 2020 and most of my friends were using the service so I hopped on to see what it was about. When I found out that you could make bots that do cool stuff I immediately wanted to try and make one. I then moved on to other projects but that was what started my love for coding.', 
         image: 'monke.gif' },
        { question: "Q: What is your go-to meal when you are feeling hungry?",
         answer: 'A: That would have to be ravioli because of their easiness to make and their deliciousness. I just boil some water make a simple tomato sauce and Voila!', 
         image: 'monke.gif' },
        { question: "Q: What other hobbies do you have aside from programming and creative writing?", 
        answer: 'A: I enjoy keeping fit and I go to the gym after school. I also play Dungeons and Dragons on the weekend with some of my friends.', 
        image: 'monke.gif' }
    ]
})
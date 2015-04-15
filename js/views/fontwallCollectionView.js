define(
[
'marionette',
'views/baseItemView',
'fonts'
],
function (Marionette, BaseItemView) {
	var FontItemView = BaseItemView.extend({
			template: '#fontwall-item-template',
		});

	return Marionette.CollectionView.extend({
		childView: FontItemView,
		isLocked: false,
		bumpOffset: function() {
			this.collection.offset += 50;
		},
		onShow: function() {
			this.initializeInfiniteScroll();
			this.collection.fetch();
		},
		loadFonts: function() {
			for (var i=0; i < this.offset; i++) {
				this.loadFont(i);
			}
		},
		initializeInfiniteScroll: function() {
		  var self = this;

		  if(!this.isLocked) {
			  $(window).on('scroll', function() {
				  var length = self.collection.models.length;
				  if(self.isScrolledIntoView('#scrollDetector') && !self.isLocked) {
					self.isLocked = true;
					self.bumpOffset();
					self.collection.fetch().then(function() {
					  console.log("fetching new shit");
					  self.isLocked = self.collection.models.length == length;
					  self.render();
					});
				  }
			  });
		  }
		},

		isScrolledIntoView: function (elem) {
			var docViewTop = $(window).scrollTop();
			var docViewBottom = docViewTop + $(window).height();

			var elemTop = $(elem).offset().top;
			var elemBottom = elemTop + $(elem).height();

			return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
		},

		onClose: function() {
		  $(window).off('scroll');
		}
	});
});
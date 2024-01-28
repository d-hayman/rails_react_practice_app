require "test_helper"

class Api::V1::SearchControllerTest < ActionDispatch::IntegrationTest
  test "should get articles" do
    get api_v1_search_articles_url
    assert_response :success
  end
end

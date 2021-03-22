"use strict";
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      let numberOfKnownTraits = parseInt(promptFor("How many traits do you know about this person?", checkForNumber));
      for (let i = 0; i < numberOfKnownTraits; i++) {
        searchResults = startSearchingByTraits(i === 0 ? people : searchResults);
      }
      if (searchResults.length > 1) {
        searchResults = getUniquePersonFrom(searchResults);
      } else {
        searchResults = searchResults[0];
      }
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch (displayOption) {
    case "info":
      displayPerson(person);
      break;
    case "family":
      // TODO: get person's family
      let family = [];

      let siblings = getSiblings(person, people)
        .map(function (sibling) {
          return "Sibling: " + sibling.firstName + " " + sibling.lastName + "\n";
        })
        .join("");

      let spouse = getSpouse(person, people)
        .map(function (spouse) {
          return "Spouse: " + spouse.firstName + " " + spouse.lastName + "\n";
        })
        .join("");
    
      let parents = getParents(person, people)
        .map(function (parents) {
          return "Parents: " + parents.firstName + " " + parents.lastName + "\n";
        })
        .join("");


      family.push(siblings);
      family.push(spouse);
      family.push(parents)
      alert(family);
      break;
    case "descendants":
      // TODO: get person's descendants
      let lineage = getChildren(person, people);
      displayDescendants(person, lineage);
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

// Search for person by selected traits
function startSearchingByTraits(people) {
  let searchResults;
  let traits = Object.keys(people[0]);
  let searchType = promptFor(`Here are the ${traits.length} available traits you can use to search:\n\n${traits.join("\n").toLowerCase()}\n\nType in a trait and click OK`, chars);
  let traitSearch = searchType.toLowerCase();
  switch (traitSearch) {
    case "id":
      searchResults = searchByid(people);
      break;
    case "firstname":
      searchResults = searchByFirstName(people);
      break;
    case "lastname":
      searchResults = searchByLastName(people);
      break;
    case "gender":
      searchResults = searchByGender(people);
      break;
    case "dob":
      searchResults = searchByDOB(people);
      break;
    case "height":
      searchResults = searchByHeight(people);
      break;
    case "weight":
      searchResults = searchByWeight(people);
      break;
    case "eyecolor":
      searchResults = searchByEyeColor(people);
      break;
    case "occupation":
      searchResults = searchByOccupation(people);
      break;
    default:
      return startSearchingByTraits(people);
  }
  return searchResults;
}
// Methods of searching
function searchByid(people) {
  let id = Number(promptFor("What is the person's id number?", checkForNumber));
  let foundPerson = people.filter(function (person) {
    if (person.id === id) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  firstName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase();
  lastName = lastName[0].toUpperCase() + lastName.slice(1).toLowerCase();

  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    } else {
      return false;
    }
  });
  foundPerson = foundPerson[0];
  return foundPerson;
}
function searchByGender(people) {
  let gender = promptFor("What is the person's gender?", chars);
  let foundPerson = people.filter(function (person) {
    if (person.gender === gender) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}
function searchByDOB(people) {
  let dob = promptFor("What is the person's birthday?\n Use the following format: mm/dd/yyyy", chars);
  let foundPerson = people.filter(function (person) {
    if (person.dob === dob) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}
function searchByHeight(people) {
  let height = Number(promptFor("What is the person's height in inches?", checkForNumber));
  let foundPerson = people.filter(function (person) {
    if (person.height === height) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}
function searchByWeight(people) {
  let weight = Number(promptFor("What is the person's weight in pounds?", checkForNumber));
  let foundPerson = people.filter(function (person) {
    if (person.weight === weight) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}
function searchByEyeColor(people) {
  let eyeColor = promptFor("What is the person's eye color?", chars);
  let foundPerson = people.filter(function (person) {
    if (person.eyeColor === eyeColor) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}
function searchByOccupation(people) {
  let occupation = promptFor("What is the person's occupation?", chars);
  let foundPerson = people.filter(function (person) {
    if (person.occupation === occupation) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}
function searchByParents(people) {
  let parents = Number(promptFor("What is the person's parent's id number?", checkForNumber));
  let foundPerson = people.filter(function (person) {
    if (person.parents === parents) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByCurrentSpouse(people) {
  let currentSpouse = Number(promptFor("What is the person's currentSpouse's id number?", checkForNumber));
  let foundPerson = people.filter(function (person) {
    if (person.currentSpouse === currentSpouse) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}
function searchByLastName(people) {
  let lastName = promptFor("What is the person's last name?", chars);
  lastName = lastName[0].toUpperCase() + lastName.slice(1).toLowerCase();
  let foundPerson = people.filter(function (person) {
    if (person.lastName === lastName) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}
function searchByFirstName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  firstName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase();
  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

// Secelction of person after search filtering
function getUniquePersonFrom(filteredPeople) {
  let names = [];
  let uniquePerson;
  for (let i = 0; i < filteredPeople.length; i++) {
    names.push(filteredPeople[i].firstName + " " + filteredPeople[i].lastName);
  }
  let selection = promptFor("Here are all the people who have those traits:\n\n" + `${names.join("\n")}\n\n` + "Do you want to search by name?", yesNo);
  if (selection === "yes") {
    uniquePerson = searchByName(filteredPeople);
  } else {
    // app(people);
    return;
  }
  return uniquePerson;
}

function getChildren(person, people) {
  let children = [];
  // let grandChildren = [];
  for (let i = 0; i < people.length; i++) {
    if (people[i].parents.includes(person.id)) {
      children.push(people[i]);
    }
  }
  // if (children.length > 0) {
  // for (let i = 0; i < children.length; i++) {
  // grandChildren = getChildren(children[i], people);
  // }
  // } else {
  // return children;
  // }
  // if (grandChildren.length > 0) {
  // for (let j = 0; j < grandChildren.length; j++) {
  // children.push(grandChildren[j]);
  // }
  // }
  return children;
}

function getSiblings(person, people) {
  let parents = [];
  let parentOne;
  let parentTwo;
  if (parents.length === 1) {
    parentOne = person.parents[0];
  } else {
    parentOne = person.parents[0];
    parentTwo = person.parents[1];
  }
  for (let i = 0; i < people.length; i++) {
    if (people[i].parents.includes(parentOne) || people[i].parents.includes(parentTwo)) {
      if (people[i].id !== person.id) {
        parents.push(people[i]);
      }
    }
  }
  return parents;
}

function getParents(people,person){
  let parents = [];
  let parentIds = person.parents;
  let idOfPerson;
  for (let i= 0; i < people.length; i++){
    idOfPerson= people[i].id;
    if(parentIds.includes(idOfPerson)){
      parents.push(people[i]);
    }
  }
  return parents;
}
function getFamilyTree(person, callback) {}

function getFirstAndLastNameFromObject(obj) {
  return `${obj.firstName} ${obj.lastName}`;
  // let fullName = "First Name: " + obj.firstName + "\n";
  // fullName += "Last Name: " + obj.lastName + "\n";
  // return fullName
}

function displayDescendants(person, descendants) {
  descendants = descendants.map(function (descendant) {
    return descendant.firstName + " " + descendant.lastName;
  });
  alert(`${person.firstName} ${person.lastName}'s descendants are:\n${descendants.join("\n")}`);
}
// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + " " + person.lastName;
      })
      .join("\n")
  );
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Age " + person.age + "\n";
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}

// helper function to pass into promptFor to validate number inputs
function checkForNumber(input) {
  return !isNaN(input);
}
